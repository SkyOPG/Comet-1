import {type commandType, event, Events} from '../utils/index.js';
import {Collection, type PermissionResolvable, type GuildMember, type Message} from 'discord.js';
import Commands from '../commands/index.js';
import Client from '../structs/client.js';
import Keys from '../keys.js';

const noprefix: string[] = [];

export default event(Events.MessageCreate, async ({log}, msag: Message) => {
	const msg = msag as Message<true>;
	let num: number;
	if (noprefix.includes(msg.author.id)) {
		if (msg.content.startsWith(Keys.prefix)) {
			num = 2;
		} else {
			num = 0;
		}
	} else {
		num = 2;
		if (!msg.content.startsWith(Keys.prefix)) {
			return;
		}
	}

	const content = msg.content.slice(num).split(' ');
	const [command, ...args]: string[] = content;
	// eslint-disable-next-line @typescript-eslint/ban-types
	const cmd: commandType | null = parseCmd(command, Commands) ?? null;

	if (!cmd) {
		return msg.reply('that command dosen\'t exist');
	}

	if (!Commands.cooldowns.has(cmd.name)) {
		Commands.cooldowns.set(cmd.name, new Collection());
	}

	const now = Date.now();
	const timestamps: Collection<string, unknown> = Commands.cooldowns.get(cmd.name) as Collection<string, unknown>;
	const defaultCooldownDuration = 3;
	const cooldownAmount = (cmd.cooldown ?? defaultCooldownDuration) * 1000;
	if (timestamps.has(msg.author.id)) {
		const expirationTime: number = timestamps.get(msg.author.id) as number + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1000);
			return msg.reply({content: `Please wait, you are on a cooldown for \`${cmd.name}\`. You can use it again <t:${expiredTimestamp}:R>.`});
		}
	}

	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	try {
		if (!cmd.enabled) {
			return await msg.channel.send('This command is disabled');
		}

		if (cmd.owner) {
			if (msg.author.id === '1119420130112315452') {
				cmd.execute(Client, msg, args);
				return;
			}

			return await msg.channel.send('This is an owner-only command...');
		}

		if (cmd.permissions && cmd.permissions.length > 0) {
			const {permissions} = cmd;
			for (const perm of permissions) {
				if (!(msg.member!).permissions.has(perm as PermissionResolvable)) {
					// eslint-disable-next-line no-await-in-loop
					return await msg.channel.send(`you don't have the required permission: ${perm}`);
				}
			}
		}

		cmd.execute(Client, msg, args);
	} catch (err) {
		log('[Error]', err);
	}
});

// eslint-disable-next-line @typescript-eslint/ban-types
function parseCmd(command: string, parser: typeof Commands): commandType | null {
	const cmd: commandType = parser.commands.get(command)!;
	if (cmd) {
		return cmd;
	}

	const alias = parser.aliases.get(command) as commandType;
	if (alias) {
		return alias;
	}

	return null;
}

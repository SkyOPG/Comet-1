/* eslint-disable array-callback-return */
import {
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	type Client,
	type Message,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from 'discord.js';
import file from './index.js';

export default {
	name: 'help',
	aliases: ['h'],
	permissions: ['SendMessages'],
	enabled: true,
	owner: false,
	async execute(client: Client<true>, message: Message<true>, args: string[]) {
		const arr: string[] = [];
		file.commands.map((value, index, array) => {
			arr.push(`\`${value.name}\``);
		});
		const cmds = arr.join(', ');
		const allCmds = new EmbedBuilder()
			.setTitle('All Commands')
			.setThumbnail(client.user.displayAvatarURL())
			.setImage('https://cdn.discordapp.com/attachments/1142109681733615757/1151505340702130318/smth.png')
			.setDescription(cmds)
			.setColor('Blue');
		const ovr = new EmbedBuilder()
			.setTitle('Help')
			.setColor('Blue')
			.setThumbnail(client.user.displayAvatarURL())
			.setImage('https://cdn.discordapp.com/attachments/1142109681733615757/1151505340702130318/smth.png')
			.setDescription('Hello! I\'m Comet, a multipurpose discord bot with the goal of being a useful bot for every type of server, i\'m currently at the indev phase but i can be invited/used!\n\n**Changelogs:**\n> **V2.0.0-TS**\n> - full rewrite to typescript\n> - bugfixes');
		const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Home')
					.setCustomId('home')
					.setEmoji('🏠')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setLabel('All Commands')
					.setCustomId('cmds')
					.setEmoji('📃')
					.setStyle(ButtonStyle.Secondary),
			);
		const select = new ActionRowBuilder<StringSelectMenuBuilder>()
		.addComponents(
			new StringSelectMenuBuilder()
			.setCustomId("cmdcats")
			.setPlaceholder("🪐 - Choose a category")
			.addOptions(
				new StringSelectMenuOptionBuilder()
				.setLabel("🏠 - Overview")
				.setDescription("The homepage of this command")
				.setValue("home"),
				new StringSelectMenuOptionBuilder()
				.setLabel("⚙️ - Config")
				.setDescription("All the Bot's configuration commands are here")
				.setValue("config"),
				new StringSelectMenuOptionBuilder()
				.setLabel("🏓 - Fun")
				.setDescription("Fun commands go here")
				.setValue("fun"),
				new StringSelectMenuOptionBuilder()
				.setLabel("⚒️ - Tools")
				.setDescription("All different tools go here")
				.setValue("tools"),
				new StringSelectMenuOptionBuilder()
				.setLabel("💲 - Economy")
				.setDescription("Economy commands go here")
				.setValue("economy"),
				new StringSelectMenuOptionBuilder()
				.setLabel("💻 - Developers")
				.setDescription("Commands for developers interested in the comet API")
				.setValue("developers")
			)
		)
		const msg = await message.channel.send({
			embeds: [ovr],
			components: [select, row],
		});
		const collector = msg.createMessageComponentCollector({
			filter: i => i.user && i.message.author.id === client.user.id,
			time: 180e3,
		});

		const mod = collector.on('collect', async b => {
			try {
				if (!b.isButton()) {
					return;
				}

				switch (b.customId) {
					case 'home':
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						await msg.edit({embeds: [ovr], components: [select, row]}).catch(async d => {});
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						b.deferUpdate().catch(d => {});
						break;
					case 'cmds':
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						await msg.edit({embeds: [allCmds], components: [select, row]}).catch(async d => {});
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						b.deferUpdate().catch(async d => {});
						break;
					default:
						await message.channel.send(b.customId);
						break;
				}
			} catch (err) {
				console.error(err);
			}
		});
	},
};

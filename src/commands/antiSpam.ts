import type {Client, Message, GuildTextChannelResolvable, ThreadChannel, AutoModerationRule, ClientUser} from 'discord.js';
import {EmbedBuilder} from 'discord.js';

export default {
	name: 'antispam',
	aliases: ['as'],
	owner: false,
	enabled: true,
	permissions: ['ManageMessages'],
	async execute(client: Client, message: Message<true>, args: string[]) {
		const {guild} = message;
		const user: ClientUser = client.user!;
		const rule: AutoModerationRule = await guild.autoModerationRules.create({
			name: `Prevent Spam messages by ${user.username}`,
			enabled: true,
			eventType: 1,
			triggerType: 3,
			triggerMetadata: {},
			actions: [{
				type: 1,
				metadata: {
					channel: message.channel as GuildTextChannelResolvable | ThreadChannel | undefined,
					durationSeconds: 10,
					customMessage: `This message was prevented by ${client.user?.username} moderation`,
				},
			}],
		}).catch(async err => {
			await message.reply('your automod rule already exists!');
		}) as AutoModerationRule;

		const embed: EmbedBuilder = new EmbedBuilder()
			// eslint-disable-next-line @typescript-eslint/naming-convention
			.setAuthor({name: `${message.guild?.name}`, iconURL: message.guild.iconURL()!})
			.setColor('#5865F2')
			.setFooter({text: `Created by: ${message.author.id}`})
			.setTimestamp();

		if (!rule) {
			return;
		}

		return message.reply({embeds: [embed]});
	},
};

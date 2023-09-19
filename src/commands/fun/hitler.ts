import { EmbedBuilder, type Client, type Message, AttachmentBuilder } from 'discord.js';

export default {
	name: 'hitler',
	aliases: [],
	permissions: [],
	enabled: true,
	async execute(client: Client<true>, message: Message<true>, args: string[]){
		const user = message.mentions.users.first() || message.author;

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setImage(`https://agg-api.vercel.app/hitler?avatar=${user.displayAvatarURL()}`)
					.setColor('Blue')
					.setFooter({
						text: 'made using the aggelos api',
						iconURL: 'https://cdn.discordapp.com/attachments/1104102867494781039/1146118753764003993/coffee.png'
					})
			],
		});
	},
};
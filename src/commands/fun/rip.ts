import { EmbedBuilder, type Client, type Message, AttachmentBuilder } from 'discord.js';

export default {
	name: 'rip',
	aliases: [],
	permissions: [],
	enabled: true,
	async execute(client: Client<true>, message: Message<true>, args: string[]){
		const user = message.mentions.users.first() || message.author;

		message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('RIP')
					.setDescription(`R.I.P ${user.username}`)
					.setImage(`https://agg-api.vercel.app/rip?avatar=${user.displayAvatarURL()}`)
					.setColor('Blue')
					.setFooter({
						text: 'made using the aggelos api',
						iconURL: 'https://cdn.discordapp.com/attachments/1104102867494781039/1146118753764003993/coffee.png'
					})
			],
		});
	},
};
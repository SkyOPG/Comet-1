import {EmbedBuilder, type Client, type Message, ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';

export default {
	name: 'username',
	enabled: true,
	aliases: [],
	permissions: [],
	async execute(client: Client<true>, message: Message<true>, args: string[]) {
		const embed = new EmbedBuilder()
			.setTitle('Viewing user ' + args[0])
			.addFields({name: 'Username', value: `\`${args[0]}\``})
			.setThumbnail(`https://mineskin.eu/headhelm/${args[0]}/100.png`)
			.setImage(`https://mineskin.eu/armor/body/${args[0]}/100.png`)
			.setColor('Blue');
		const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Download')
					.setURL(`https://mineskin.eu/download/${args[0]}`)
					.setStyle(ButtonStyle.Link),
			);
		await message.channel.send({
			embeds: [
				embed,
			],
			components: [
				row,
			],
		});
	},
};

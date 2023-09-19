import axios from 'axios';
import {EmbedBuilder, type Client, type Message, AttachmentBuilder} from 'discord.js';

export default {
	name: 'mcserver',
	enabled: true,
	aliases: [],
	permissions: [],
	async execute(client: Client<true>, message: Message<true>, args: string[]) {
		const likes = await axios.get(`https://api.namemc.com/server/${args[0]}/likes`);
		const status = await axios.get(`https://api.mcsrvstat.us/3/${args[0]}`);
		const isOnline = await axios.get(`https://api.mcsrvstat.us/simple/${args[0]}`);

		if (isOnline.status === 200) {
			const buf = Buffer.from((status.data as {icon: string}).icon, 'base64');
			const attachment = new AttachmentBuilder(buf, {name: 'index.png'});
			const embed = new EmbedBuilder()
				.setTitle(`Viewing Server ${args[0]}`)
				.setThumbnail('attachment://index.png')
				.addFields(
					{
						name: 'Server Name',
						value: args[0],
						inline: true,
					},
					{
						name: 'Likes on NameMC',
						value: `${(likes.data as string[]).length}`,
						inline: true,
					},
					{
						name: 'Online?',
						value: `${isOnline.status === 200 ? 'yes' : 'no'}`,
						inline: true,
					},
					{
						name: 'Players online',
						value: `${status.data.players.online}/${status.data.players.max}`,
						inline: true,
					},
				)
				.setColor('Blue');
			return await message.channel.send({
				embeds: [
					embed,
				],
				files: [
					attachment,
				],
			});
		}
	},
};

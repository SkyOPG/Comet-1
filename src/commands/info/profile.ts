import meta from 'meta-discord';
import type {Message, Client} from 'discord.js';
import {AttachmentBuilder} from 'discord.js';

export default {
	name: 'profile',
	aliases: [],
	owner: false,
	permissions: ['SendMessages'],
	enabled: true,
	async execute(client: Client<true>, message: Message<true>, args: string[]) {
		const msg = await message.reply('please wait');

		const ide = message.author.id;

		if (ide === '1119420130112315452') {
			const buffer = await meta.profileImage(ide, {
				customTag: 'Developer',
				customBackground: 'https://media.discordapp.net/attachments/1147237542337458307/1149307764938653807/white-cloud-blue-sky.jpg?width=801&height=534',
				usernameColor: '#d9dfef',
				borderColor: ['#4a9edf', '#4275b7'],
			});
			const image = new AttachmentBuilder(buffer, {name: 'profile.png'});

			await msg.edit({content: '', files: [image]});
		} else if (ide === client.user.id) {
			const buffer = await meta.profileImage(ide, {
				customTag: 'The Bot',
				customBackground: 'https://media.discordapp.net/attachments/1136275078745702433/1141545828348067970/26_april_8.jpg?width=801&height=534',
				usernameColor: '#d9dfef',
				borderColor: ['#4a9edf', '#4275b7'],
			});
			const image = new AttachmentBuilder(buffer, {name: 'profile.png'});

			await msg.edit({content: '', files: [image]});
		} else {
			const buffer = await meta.profileImage(ide, {
				customTag: 'User',
				usernameColor: '#d9dfef',
				borderColor: ['#4a9edf', '#4275b7'],
			});
			const image = new AttachmentBuilder(buffer, {name: 'profile.png'});

			await msg.edit({content: '', files: [image]});
		}
	},
};

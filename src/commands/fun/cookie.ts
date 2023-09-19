import type {Client, Message} from 'discord.js';

export default {
	name: 'cookie',
	aliases: ['cookies'],
	owner: false,
	enabled: true,
	permissions: [],
	async execute(_client: Client, message: Message, _args: string[]) {
		return message.reply('🍪');
	},
};

import type {Client, Message} from 'discord.js';
import {EmbedBuilder} from 'discord.js';
import schema from '../utils/Schemas/partners.js';

export default {
	name: 'partners',
	aliases: [],
	enabled: true,
	owner: false,
	permissions: ['SendMessages'],
	async execute(client: Client, message: Message, args: string[]) {
		console.log('a');
	},
};

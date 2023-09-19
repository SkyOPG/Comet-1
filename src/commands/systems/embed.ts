import type {Client, Message} from 'discord.js';
import {soon} from '../utils/functions.js';
import embedSchema from '../utils/Schemas/embed.js';
type Cmd = 'create' | 'show' | 'delete' | 'list';
type Options = {
	OwnerID: string;
	Name: string;
	Embed: {
		Title: string;
		Description: string;
		Footer: {
			Text: string;
			IconURL: string;
		};
		Color: string;
		Thumbnail: string;
		Author: {
			Name: string;
			IconURL: string;
			URL: string;
		};
	};
};

export default {
	name: 'embed',
	aliases: [],
	permissions: [],
	enabled: true,
	async execute(client: Client<true>, message: Message<true>, args: string[]) {
		const command: Cmd = args.shift() as Cmd;
		const {model} = embedSchema;
		await soon(client, message);
	},
};

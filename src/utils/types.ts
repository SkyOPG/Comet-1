import type {Client, Message} from 'discord.js';

/* eslint-disable @typescript-eslint/naming-convention */
export type commandType = {
	name: string;
	aliases: string[];
	permissions: string[];
	owner: boolean;
	enabled: boolean;
	execute: commandFunc;
	cooldown: number;
};
export type commandFunc = (client: Client<true>, message: Message<true>, args: string[]) => void;

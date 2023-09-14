import {Collection} from 'discord.js';
import type {commandType} from '../utils/types.js';
import ping from './ping.js';
import cookie from './cookie.js';
import antispam from './antiSpam.js';
import bal from './bal.js';
import ball from './ball.js';
import bot from './bot.js';
import evalcmd from './eval.js';
import filecmd from './file.js';
import help from './help.js';
import hangman from './hangman.js';
import snake from './snake.js';
import profile from './profile.js';
import server from './server.js';
import about from './about.js';
import embed from './embed.js';
import counting from './counting.js';
import username from './username.js';
import mcserver from './mcserver.js';
import rip from './rip.js';
import gun from './gun.js';
import jail from './jail.js';
import hitler from './hitler.js';
import coffee from './coffee.js';

const arr: Array<Record<string, unknown>> = [
	ping,
	cookie,
	antispam,
	bal,
	ball,
	bot,
	evalcmd,
	filecmd,
	help,
	snake,
	hangman,
	profile,
	server,
	about,
	embed,
	counting,
	username,
	mcserver,
	rip,
	gun,
	jail,
	hitler,
	coffee
];

const file: {
	commands: Collection<string, commandType>;
	aliases: Collection<string, unknown>;
	cooldowns: Collection<string, unknown>;
} = {
	commands: new Collection(),
	aliases: new Collection(),
	cooldowns: new Collection(),
};

arr.forEach((val: any) => {
	(file.commands as Collection<unknown, unknown>).set(val.name, val);
	(val.aliases as string[]).forEach((element: any) => {
		(file.aliases as Collection<unknown, unknown>).set(element, val);
	});
});

export default file;

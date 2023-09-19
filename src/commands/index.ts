import {Collection} from 'discord.js';
import type {commandType} from '../utils/types.js';
// utility
import ping from './utility/ping.js';
import evalcmd from './utility/eval.js';
import help from './utility/help.js';
import about from './utility/about.js';
// fun
import cookie from './fun/cookie.js';
import ball from './fun/ball.js';
import hangman from './fun/hangman.js';
import snake from './fun/snake.js';
import rip from './fun/rip.js';
import gun from './fun/gun.js';
import jail from './fun/jail.js';
import hitler from './fun/hitler.js';
import coffee from './fun/coffee.js';
// moderation
import antispam from './moderation/antiSpam.js';
import say from './moderation/say.js';
// api
// economy
import bal from './economy/bal.js';
// info
import bot from './info/bot.js';
import profile from './info/profile.js';
import server from './info/server.js';
import username from './info/username.js';
import mcserver from './info/mcserver.js';
// systems
import filecmd from './systems/file.js';
import embed from './systems/embed.js';
import counting from './systems/counting.js';
import tickets from './systems/tickets.js';

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
	coffee,
	say,
	tickets
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
	file.commands.set(val.name, val);
	val.aliases.forEach((element: any) => {
		file.aliases.set(element, val);
	});
});

export default file;

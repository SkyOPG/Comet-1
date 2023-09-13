/* eslint-disable @typescript-eslint/naming-convention */
import {event, Events} from '../utils/index.js';
import {EmbedBuilder, type Message} from 'discord.js';
import client from '../structs/client.js';
import Keys from '../keys.js';
import model from '../utils/Schemas/counting.js';

export default event(Events.MessageCreate, async ({log}, msag: Message) => {
	const message = msag as Message<true>;
	if (message.author.bot) {
		return 'a';
	}

	const data = await model.findOne({Guild: message.guild.id, Channel: message.channel.id});
	if (!data) {
		return 'a';
	}

	if (((data as unknown) as {Channel: string}).Channel !== message.channel.id) {
		return 'a';
	}

	// eslint-disable-next-line radix
	const int = parseInt(message.content);
	if (Number.isNaN(int)) {
		return 'a';
	}

	if (((data as unknown) as {LastUser: string}).LastUser && ((data as unknown) as {LastUser: string}).LastUser === message.author.username) {
		await message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('you broke a rule..')
					.setDescription('All progress has reset.\n- Current number: 1')
					.setColor('Blue')
					.setAuthor({name: message.author.username, iconURL: client.user!.displayAvatarURL()}),
			],
		});

		((data as unknown) as {Number: number}).Number = 0;
		((data as unknown) as {LastUser: string}).LastUser = 'null';
		await data.save();

		return 'a';
	}

	const num = ((data as unknown) as {Number: number}).Number;
	console.log(num);
	// eslint-disable-next-line radix
	const num1 = parseInt(`${num}`);
	console.log(int);

	if (num1 + 1 !== int) {
		console.log(`${num1 + 1} is not equal to ${int}`);
		await message.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('RUINED IT AT ' + (num1 + 1))
					.setDescription('All progress has reset.\n- Current number: 1')
					.setColor('Blue')
					.setAuthor({name: message.author.username, iconURL: client.user!.displayAvatarURL()}),
			],
		});

		((data as unknown) as {Number: number}).Number = 0;
		await data.save();

		return 'a';
	}

	await message.react('✅');
	((data as unknown) as {Number: number}).Number = num1 + 1;
	((data as unknown) as {LastUser: string}).LastUser = message.author.username;
	await data.save();
});

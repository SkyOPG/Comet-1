/* eslint-disable @typescript-eslint/naming-convention */
import {EmbedBuilder, type Client, type Message, type GuildBasedChannel} from 'discord.js';
import model from '../utils/Schemas/counting.js';

export default {
	name: 'counting',
	enabled: true,
	aliases: ['count'],
	permissions: ['ManageChannels'],
	async execute(client: Client<true>, message: Message<true>, args: string[]) {
		switch (args[0]) {
			case 'setup':
				await setup(client, message, args);
				break;
			case 'delete':
				await del(client, message, args);
				break;
			case 'fix':
				await fix(client, message, args);
				break;
			default:
				await nun(client, message, args);
				break;
		}
	},
};

async function setup(client: Client<true>, message: Message<true>, args: string[]) {
	const amt = await model.find();
	const data = await model.findOne({Guild: message.guild.id});
	if (data) {
		return message.channel.send({embeds: [
			new EmbedBuilder()
				.setTitle('Data already exists')
				.setAuthor({name: '| Error', iconURL: client.user.displayAvatarURL()})
				.setDescription('This server already has a counting channel set up.\n if you want to opt out just use the `c!counting delete` command, or if you want to fix it use `c!counting fix`')
				.setColor('Blue')
				.setFooter({text: 'Invite me!', iconURL: client.user.displayAvatarURL()})
				.setThumbnail(client.user.displayAvatarURL()),
		]});
	}

	await message.guild.channels.create({
		name: 'counting',
	}).then(async chan => {
		const channelid = chan.id;
		await chan.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Counting')
					.setDescription('> Welcome to the counting channel!\nRules:\n- No back to back counting\n- No wrong numbers')
					.setFooter({
						text: 'this server is the number ' + amt.length,
					}),
			],
		});
		await model.create({
			Guild: message.guild.id,
			Channel: channelid,
			Number: 0,
		});
		await message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Channel setup successful!')
					.setDescription('Your channel setup is done!\n> your channel is: <#' + channelid + '>\n> You can rename it or move it anywhere\n> enjoy!')
					.setColor('Blue')
					.setFooter({text: 'Invite me!', iconURL: client.user.displayAvatarURL()})
					.setThumbnail(client.user.displayAvatarURL()),
			],
		});
	});
}

async function del(client: Client<true>, message: Message<true>, args: string[]) {
	const data = await model.findOne({Guild: message.guild.id});
	if (!data) {
		return message.channel.send({
			embeds: [
				new EmbedBuilder()
					.setAuthor({name: '| Error', iconURL: client.user.displayAvatarURL()})
					.setTitle('No data found')
					.setDescription('There is no data about this server in the database.\n> please use `c!counting setup` to setup a counting channel')
					.setColor('Blue')
					.setFooter({text: 'Invite me!', iconURL: client.user.displayAvatarURL()})
					.setThumbnail(client.user.displayAvatarURL()),
			],
		});
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	await message.guild.channels.fetch(((data as unknown) as {Channel: string}).Channel).then(async (ch: GuildBasedChannel | null) => {
		await (ch!).delete();
	});
	await data.delete();
	await message.channel.send({
		embeds: [
			new EmbedBuilder()
				.setTitle('Deleted Channel')
				.setDescription('Deleted channel and all data from the database')
				.setColor('Blue')
				.setFooter({text: 'Invite me!', iconURL: client.user.displayAvatarURL()})
				.setThumbnail(client.user.displayAvatarURL()),
		],
	});
}

async function fix(client: Client<true>, message: Message<true>, args: string[]) {
	const amt = await model.find();
	const data = await model.findOne({Guild: message.guild.id});
	if (!data) {
		await message.guild.channels.create({
			name: 'counting',
		}).then(async chan => {
			const channelid = chan.id;
			await chan.send({
				embeds: [
					new EmbedBuilder()
						.setTitle('Counting')
						.setDescription('> Welcome to the counting channel!\nRules:\n- No back to back counting\n- No wrong numbers')
						.setFooter({
							text: 'this server is the number ' + amt.length,
						}),
				],
			});
			await model.create({
				Guild: message.guild.id,
				Channel: channelid,
				Number: 0,
			});
			await message.channel.send({
				embeds: [
					new EmbedBuilder()
						.setTitle('Channel setup successful!')
						.setDescription('Your channel setup is done!\n> your channel is: <#' + channelid + '>\n> You can rename it or move it anywhere\n> enjoy!')
						.setColor('Blue')
						.setFooter({text: 'Invite me!', iconURL: client.user.displayAvatarURL()})
						.setThumbnail(client.user.displayAvatarURL()),
				],
			});
		});
	} else if (data) {
		// eslint-disable-next-line @typescript-eslint/ban-types
		await message.guild.channels.fetch(((data as unknown) as {Channel: string}).Channel).then(async (ch: GuildBasedChannel | null) => {
			await (ch!).delete();
		});
		await data.delete();
		await setup(client, message, args);
	}
}

async function nun(client: Client<true>, message: Message<true>, args: string[]) {
	await message.channel.send({
		embeds: [
			new EmbedBuilder()
				.setTitle('Counting')
				.setColor('Blue')
				.setThumbnail(client.user.displayAvatarURL())
				.setFooter({
					text: 'Invite me!',
					iconURL: client.user.displayAvatarURL(),
				})
				.setDescription('Please use one of the subcommands below:\n- `c!counting setup`\n- `c!counting delete`\n- `c!counting fix`'),
		],
	});
}

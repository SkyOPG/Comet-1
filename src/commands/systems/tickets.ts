import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, Message } from "discord.js";
import model from '../utils/Schemas/tickets.js';
export default {
	name: "tickets",
	aliases: [],
	permissions: [],
	enabled: true,
	async execute(client: Client<true>, message: Message<true>, args: string[]): Promise<void | Message<true>> {
		const subcommand = args.shift();
		const data = await model.findOne({
			guild: message.guild.id
		})

		switch(subcommand){
			case "category": {
				const channel = args.shift();
				if(!channel)
					return message.channel.send("no channel given")
				const cached = message.guild.channels.cache.get(channel);
				if(!cached)
					return message.channel.send("invalid channel")
				if(cached.type !== ChannelType.GuildCategory) return message.channel.send("channel isn't a category")
				try{
					if(data){
						await model.updateOne({
							guild: message.guild.id
						},{
							guild: message.guild.id,
							category: channel
						})
					} else {
						await model.create({
							guild: message.guild.id,
							category: channel
						});
					}
					message.channel.send("added to database");
				} catch(e){
					console.log(e);
					return;
				}
			} break;
			case "panel": {
				return message.channel.send({ content: "Click the button below!", components: [
					new ActionRowBuilder<ButtonBuilder>()
					.addComponents(
						new ButtonBuilder()
						.setLabel("Create")
						.setStyle(ButtonStyle.Secondary)
						.setCustomId("createtic")
					)
				] })
			} break;
			default:
				return message.channel.send("not enough arguments");
		}
	}
}
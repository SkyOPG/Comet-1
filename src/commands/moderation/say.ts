import { Client, EmbedBuilder, Message } from "discord.js";

export default {
	name: "say",
	aliases: ["repeat"],
	permissions: ["SendMessages"],
	enabled: true,
	category: "Fun",
	async execute(client: Client<true>, message: Message<true>, args: string[]): Promise<void | Message<true>>  {
		if(!args)
			return message.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({
							name: message.author.username,
							iconURL: message.author.displayAvatarURL()
						})
						.setTitle("Error")
						.setDescription("You didn't provide any arguments!")
						.setColor("Blue")
						.setFooter({
							text: "Invite me!",
							iconURL: client.user.displayAvatarURL()
						})
				]
			});
		if(message.member!.permissions.has("Administrator"))
			message.channel.send(args.join(" "));
		else
			message.channel.send(args.join(" ").replace("@everyone", "").replace("@here", ""))
	}
}
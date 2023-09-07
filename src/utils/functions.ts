import { EmbedBuilder } from "discord.js";
import type { Client, Message } from "discord.js";

export function soon(client: Client<true>, message: Message<true>){
    return message.channel.send({ embeds:[new EmbedBuilder().setColor("Blue").setAuthor({ name: "Comet", iconURL: client.user.displayAvatarURL() }).setDescription("This Command isn't ready for anything yet, as it doesn't have a `message.channel.send()` or `message.reply()`.")]})
}

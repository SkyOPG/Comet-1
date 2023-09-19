import { EmbedBuilder } from 'discord.js';
import axios from 'axios';
import util from 'node:util';

export default {
    name: "eval",
    owner: true,
    aliases: [],
    permissions: [],
    enabled: true,
    async execute(client, message, args){
        const embed = new EmbedBuilder()
       .addFields([{ name: "Input", value: "```js\n" + args.join(" ") + "```"}
        ])
        .setColor("Blue");
        try{
            const code = args.join(" ");
            if (!code) return message.channel.send("No code provided.")
            let evaled;

            if (code.includes(`token`)) {
                evaled = "No, shut up, what will you do with the token?";
            } else {
                evaled = await eval(code);
            }
            if (typeof evaled !== "string") evaled = await util.inspect(evaled, { depth: 0 });
            const output = clean(evaled);
            if (output.length > 1024) {
               
                const { data } = await axios.post("https://hastebin.com/documents", {
                    body: output
                })
                embed.addFields([{ name: "Output", value: `https://hastebin.com/${data.key}.js`, inline: true }]).setColor(client.embedColor);
              
            } else {
                embed.addFields([{ name: "Output", value: "```js\n" + output + "```", inline: true }]).setColor(client.embedColor);
            }

            message.channel.send({embeds: [embed]});
        } catch(e: any){
            const err = clean(e);
            if (err.length > 1024) {
               
                const { data } = await axios.post("https://hastebin.com/documents", {
                    body: err
                });
                embed.addFields([{ name: "Errors", value: `https://hastebin.com/${data.key}.js`, inline: true }]).setColor("Red");
            } else {
                embed.addFields([{ name: "Errors", value: "```js\n" + err + "```", inline: true }]).setColor("Red");
            }

            message.channel.send({embeds: [embed]});
        }
    }
}

function clean(str) {
    if(typeof str === "string")
        return str.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    else
        return str;
        
}
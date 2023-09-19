import { event, Events } from '../utils/index.js';
import schema from '../utils/Schemas/tickets.js';

export default event(Events.InteractionCreate, async ({ log }, interaction) => {
    if(interaction.isButton()){
		const data = await schema.findOne({
			guild: interaction.guildId
		}) as unknown as {
			guild: string,
			category: string
		}
        switch(interaction.customId){
			case "createtic": {
				const { guild, category } = data;
				if(!guild || !category)
					return interaction.reply({
						content: 'there is no data for this server',
						ephemeral: true
					});
			await interaction.guild?.channels.create({
				name: 'test',
				parent: category
			}).catch(() => {
				return interaction.reply("Something's wrong")
			});
			interaction.reply("i made you a channel!")
			} break;
			default: break;
		}
    }
})
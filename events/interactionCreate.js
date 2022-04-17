module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isCommand()) {
			handleCommandInteraction(interaction, client);
		} else if (interaction.isSelectMenu()) {
			handleSelectMenuInteraction(interaction);
		}
	},
};

const handleCommandInteraction = async (interaction, client) => {
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
	}
};

const handleSelectMenuInteraction = async (interaction) => {
	const { customId, values, member } = interaction;

	if (customId === 'auto_roles') {
		const component = interaction.component;

		const toRemove = component.options.filter(option => {
			return !values.includes(option.value);
		});

		for (const id of toRemove) {
			member.roles.remove(id.value);
		}

		for (const id of values) {
			member.roles.add(id);
		}

		interaction.reply({
			content: 'Cargos atualizados!',
			ephemeral: true,
		});
	}
};
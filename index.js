const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { guildId, token } = require('./config.json');
const { permissions } = require('./permissions.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
	const guild = client.guilds.cache.get(guildId);
	const commands = await guild.commands.fetch();
	await commands.forEach(slashCommand => {
		console.log(`Setting permission for command "${slashCommand.name}" (${slashCommand.id})`);
		guild.commands.permissions.add({
			command: slashCommand.id,
			permissions,
		});
	});
	console.log('Bot is ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

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
});
client.login(token);
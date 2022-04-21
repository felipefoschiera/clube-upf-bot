import * as fs from 'node:fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const importCommand = async (file) => {
	const command = await import(`./commands/${file}`);
	return command.data.toJSON();
};

const setCommands = async (commandFiles) => {
	const commands = await Promise.all(commandFiles.map(importCommand));
	return commands;
};

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && !file.startsWith('index'));

(async () => {
	const commands = await setCommands(commandFiles);
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

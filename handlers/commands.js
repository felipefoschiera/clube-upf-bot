import * as fs from 'node:fs';
import { Collection } from 'discord.js';

export const handleCommands = (client) => {
	client.commands = new Collection();
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && !file.startsWith('index'));

	commandFiles.forEach(async file => {
		const command = await import(`../commands/${file}`);
		client.commands.set(command.data.name, command);
	});
};

const fs = require('node:fs');
const { Collection } = require('discord.js');

const handleCommands = (client) => {
	client.commands = new Collection();
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	commandFiles.forEach(file => {
		const command = require(`../commands/${file}`);
		client.commands.set(command.data.name, command);
	});
};

module.exports = {
	handleCommands,
};
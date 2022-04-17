const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const handleCommands = () => {
	client.commands = new Collection();
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	commandFiles.forEach(file => {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
	});
};

const handleEvents = () => {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

	eventFiles.forEach(file => {
		const event = require(`./events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	});
};

handleCommands();
handleEvents();

client.login(process.env.TOKEN);
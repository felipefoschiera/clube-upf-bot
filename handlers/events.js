const fs = require('node:fs');

const handleEvents = (client) => {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

	eventFiles.forEach(file => {
		const event = require(`../events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	});
};

module.exports = {
	handleEvents,
};

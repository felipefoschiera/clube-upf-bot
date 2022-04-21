import * as fs from 'node:fs';

export const handleEvents = (client) => {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js') && !file.startsWith('index'));

	eventFiles.forEach(async file => {
		const event = await import(`../events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	});
};

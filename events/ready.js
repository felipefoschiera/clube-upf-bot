const { guildId } = require('../config.json');
const { permissions } = require('../permissions.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
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
	},
};
const { permissions } = require('../permissions.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const commands = await guild.commands.fetch();
		await commands.forEach(slashCommand => {
			console.log(`Definindo permissões para o comando "${slashCommand.name}" (${slashCommand.id})`);
			guild.commands.permissions.add({
				command: slashCommand.id,
				permissions,
			});
		});
		console.log('Bot está pronto!');
	},
};
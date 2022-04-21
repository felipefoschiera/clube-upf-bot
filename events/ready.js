const { setCodeforcesCronJob } = require('../codeforces/schedule');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const permissions = JSON.parse(process.env.PERMISSIONS);
		const commands = await guild.commands.fetch();
		await commands.forEach(slashCommand => {
			console.log(`Definindo permissões para o comando "${slashCommand.name}" (${slashCommand.id})`);
			guild.commands.permissions.add({
				command: slashCommand.id,
				permissions,
			});
		});

		await setCodeforcesCronJob(client);
		console.log('Bot está pronto!');
	},
};

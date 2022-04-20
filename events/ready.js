const cron = require('cron');
const { getContestsMessage } = require('../codeforces/contests');

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


const setCodeforcesCronJob = async (client) => {
	// Runs every day at 07:00 (UTC)
	const CRON_PATTERN = '0 0 7 * * *';

	const scheduledMessage = new cron.CronJob(CRON_PATTERN, async () => {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const channel = guild.channels.cache.get(process.env.CONTESTS_CHANNEL_ID);
		const contestsMessage = await getContestsMessage();
		await channel.send(contestsMessage);
	});

	scheduledMessage.start();
};
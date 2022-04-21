import * as cron from 'cron';
import { getContestsMessage } from './contests';

export const setCodeforcesCronJob = async (client) => {
	// Runs every day at 13:00 (UTC) / 10:00 (BRT)
	const CRON_PATTERN = '0 0 13 * * *';

	const scheduledMessage = new cron.CronJob(CRON_PATTERN, async () => {
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const channel = guild.channels.cache.get(process.env.CONTESTS_CHANNEL_ID);
		const contestsMessage = await getContestsMessage();
		await channel.send(contestsMessage);
	});

	scheduledMessage.start();
};

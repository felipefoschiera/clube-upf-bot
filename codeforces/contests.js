const fetch = require('node-fetch');

const CODEFORCES_CONTEST_API = 'https://codeforces.com/api/contest.list';
const LOCALE = 'pt-br';
const SECONDS_IN_A_WEEK = 604800;

const getContestsMessage = async () => {
	const response = await fetch(CODEFORCES_CONTEST_API);
	const data = await response.json();
	const filtered = await filterContests(data);
	return buildContestsString(filtered);
};

const filterContests = async (data) => {
	return data['result']
		.filter(contest => contestWithinAWeek(contest))
		.filter(contest => contestHasNotFinished(contest))
		.map(contest => contestAsMessage(contest));
};

const contestWithinAWeek = (contest) => {
	return Math.abs(contest.relativeTimeSeconds) <= SECONDS_IN_A_WEEK;
};

const contestHasNotFinished = (contest) => {
	return contest.phase === 'BEFORE';
};

const contestAsMessage = (contest) => {
	const utcDate = new Date(0);
	utcDate.setUTCSeconds(contest.startTimeSeconds);
	const localDate = utcDate.toLocaleDateString(LOCALE);
	const localTime = utcDate.toLocaleTimeString(LOCALE);
	const localDateTime = `${localDate} ${localTime}`;
	return `Contest: **${contest.name}**\nInício: ${localDateTime}\n`;
};

const buildContestsString = (contests) => {
	return '**[Codeforces] Contests até a próxima semana:**\n' + contests.join('\n');
};

module.exports = {
	getContestsMessage,
};


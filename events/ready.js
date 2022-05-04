import { setCodeforcesCronJob } from '../codeforces';

export const name = 'ready';
export const once = true;

export const execute = async (client) => {
	await setCodeforcesCronJob(client);
	console.log('Bot está pronto!');
};

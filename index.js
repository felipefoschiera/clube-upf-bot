import { Client, Intents } from 'discord.js';
import { handleCommands, handleEvents } from './handlers';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

handleCommands(client);
handleEvents(client);

client.login(process.env.TOKEN);
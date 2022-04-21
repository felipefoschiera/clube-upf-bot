const { Client, Intents } = require('discord.js');
const { handleCommands } = require('./handlers/commands');
const { handleEvents } = require('./handlers/events');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

handleCommands(client);
handleEvents(client);

client.login(process.env.TOKEN);
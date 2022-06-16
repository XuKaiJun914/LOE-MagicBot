const { Client, Intents } = require('discord.js');
const discordModals = require('discord-modals')

global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    disableMentions: 'everyone',
});

discordModals(client);

client.config = require('./config');

require('./src/loader');
token = (client.config.app.developmet ? client.config.app.DevelopmentToken : client.config.app.ProductionToken)
client.login(token);
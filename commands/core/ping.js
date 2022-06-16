module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`延遲:**${client.ws.ping}ms** 🛰️`);
    },
};
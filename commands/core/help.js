const { MessageEmbed, EmbedAuthorData } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('RED');

        const commands = client.commands.filter(x => x.showHelp !== false);

        embed.addField(`指令 - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
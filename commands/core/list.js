const fs = require('fs');

module.exports = {
    name: 'list',
    aliases: [],
    utilisation: '{prefix}list',

    execute(client, message) {
        let allroles = ""
        try {
            let v = []
            message.guild.roles.cache.find(role => role.name === message.mentions.roles.first().name).members.map(m=>v.push({"id":m.user.id,"name":message.guild.members.cache.get(m.user.id).displayName}));
            v.forEach(e => {
                allroles += "add_principal identifier.discord:"+e.id+" #" + e.name + "\n"
            });
            fs.writeFile('uid.txt', allroles,function(){})
            message.channel.send({ files: ["uid.txt"] });
        } catch (error) {
            message.reply("請確認是否有正確標註")
        }
    },
};
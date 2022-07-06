const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js');
const fs = require("fs")

module.exports = {
    name: 'staff',
    aliases: [],
    utilisation: '{prefix}staff',
    async execute(client, message, args) {
        let user = message.mentions.members.first()
        let role = {
            staff:"984533385802289272",
            mt:"984533388029472809",
            dcdev:"984533392576106506"
        }
        switch (args[0]) {
            case "staff":
                message.guild.members.cache.get(user.id).roles.add(role.staff);
                break;
            case "mt":
                message.guild.members.cache.get(user.id).roles.add(role.staff);
                message.guild.members.cache.get(user.id).roles.add(role.mt);
                break;
            case "dcdev":
                message.guild.members.cache.get(user.id).roles.add(role.staff);
                message.guild.members.cache.get(user.id).roles.add(role.dcdev);
                break;
            default:
                message.reply("請輸入正確的職位名稱 [staff, mt, dcdev]")
                break;
        }
    }
};

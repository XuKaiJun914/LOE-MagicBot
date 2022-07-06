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
                message.reply(`<@${user.id}> 已獲得 Staff 身份`)
                break;
            case "mt":
                message.guild.members.cache.get(user.id).roles.add(role.staff);
                message.guild.members.cache.get(user.id).roles.add(role.mt);
                message.reply(`<@${user.id}> 已獲得 MT 身份`)
                break;
            case "dcdev":
                message.guild.members.cache.get(user.id).roles.add(role.staff);
                message.guild.members.cache.get(user.id).roles.add(role.dcdev);
                message.reply(`<@${user.id}> 已獲得 DC DEV 身份`)
                break;
            default:
                message.reply("請輸入正確的職位名稱 [staff, mt, dcdev]")
                break;
        }
        message.delete();
    }
};

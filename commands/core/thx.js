const { MessageActionRow, MessageButton, MessageEmbed, Message} = require('discord.js');
const fs = require("fs")

module.exports = {
    name: 'thx',
    aliases: [],
    utilisation: '{prefix}thx',
    async execute(client, message, args) {
        let user = message.mentions.members.first()
        let database = JSON.parse(fs.readFileSync('database.json', function (){}));
        let expire = new Date;
        let now = Date.now()
        if(args[1] == undefined || isNaN(parseInt(args[1]))){
            await message.reply(`查詢: <@${user.id}> 目前剩餘 ${Math.floor(((database["贊助身份組"][user.id] - now) / 86400 / 1000)*10)/10} 天`)
                await message.delete()
            return
        }
        message.guild.members.cache.get(user.id).roles.add("984533395352723456");
            database["贊助身份組"][user.id] = (database["贊助身份組"][user.id] == undefined ? now : database["贊助身份組"][user.id]) + Math.floor(parseFloat(args[1]) * 86400 * 1000)
            await message.reply(`已為 <@${user.id}> 新增 ${parseFloat(args[1])} 天的奠基者身份,共剩餘 ${Math.floor(((database["贊助身份組"][user.id] -now) / 86400 / 1000)*10)/10} 天`)
            await message.delete()
            fs.writeFileSync("database.json", JSON.stringify(database));
    }
};

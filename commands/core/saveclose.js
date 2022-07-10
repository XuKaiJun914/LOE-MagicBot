const { MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const fs = require('fs');
const { isKeyObject } = require('util/types');

module.exports = {
    name: 'saveclose',
    aliases: [],
    utilisation: '{prefix}saveclose',
    async execute(client, message, args) {
        let database = JSON.parse(fs.readFileSync('database.json', function (){}));
        let isTicket = false
        let owner = undefined
        for(e in database["工單"]){
            if (typeof database["工單"][e] != "object") continue;
            if (database["工單"][e].catChannel == message.channel.parentId) {
                isTicket = true
                if (database["工單"][e].channel[message.channel.id] != undefined) {
                    owner = database["工單"][e].channel[message.channel.id]
                }
            }
        }
        if (isTicket && owner != undefined){
            let embed = new MessageEmbed()
                .setColor(0xe7ddb0)
                .setTitle(':grey_question: 你確定嗎？')
                .setDescription("確認後將會把此工單封存，並且將會將工單設定為已解決狀態。")
                .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
                row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`saveclose-是-${owner}-${args.join(" ")}`)
                        .setLabel('是')
                        .setStyle('SUCCESS')
                        .setEmoji('⭕')
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('saveclose-否')
                        .setLabel('否')
                        .setStyle('DANGER')
                        .setEmoji('❌')
                )
            await message.reply({embeds: [embed], components: [row]})
        }
        
    }
};
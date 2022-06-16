const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require('discord.js');

module.exports = {
    name: 'button',
    aliases: [],
    utilisation: '{prefix}button',

    async execute(client, message, args) {
        let embed = null;
        let row = null;
        switch (args[0]) {
            case "移民申請":
                embed = new MessageEmbed()
                    .setColor(0xe7ddb0)
                    .setTitle('點擊下方對應案件的按鈕以進行移民申請') 
                    .setDescription("如沒有收到私訊請確認是否已允許來自伺服器成員的私人訊息，如有任何問題請開工單詢問")
                    .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
                    row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('移民申請')
                            .setLabel('移民申請')
                            .setStyle('SUCCESS')
                            .setEmoji('✅')
                    )
                break;
            case "工作組申請":
                embed = new MessageEmbed()
                    .setColor(0xe7ddb0)
                    .setTitle('點擊下方按鈕以申請加入工作組') 
                    .setDescription("如沒有收到私訊請確認是否已允許來自伺服器成員的私人訊息，如有任何問題請開工單詢問")
                    .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
                    row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('工作組申請')
                            .setLabel('工作組申請')
                            .setStyle('PRIMARY')
                            .setEmoji('🛂')
                    )
                break;
                case "執法人員申請":
                    embed = new MessageEmbed()
                        .setColor(0xe7ddb0)
                        .setTitle('點擊下方按鈕以申請加入執法人員') 
                        .setDescription("如沒有收到私訊請確認是否已允許來自伺服器成員的私人訊息，如有任何問題請開工單詢問")
                        .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
                        row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('執法人員申請')
                                .setLabel('執法人員申請')
                                .setStyle('PRIMARY')
                                .setEmoji('👮')
                        )
                    break;
            case "面試官申請":
                embed = new MessageEmbed()
                    .setColor(0xe7ddb0)
                    .setTitle('點擊下方按鈕以申請加入面試官') 
                    .setDescription("如沒有收到私訊請確認是否已允許來自伺服器成員的私人訊息，如有任何問題請開工單詢問")
                    .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
                    row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('面試官申請')
                            .setLabel('面試官申請')
                            .setStyle('PRIMARY')
                            .setEmoji('👨‍✈️')
                    )
                break;
            case "提交工單":
                embed = new MessageEmbed()
                    .setColor(0xe7ddb0)
                    .setTitle('提交工單') 
                    .setDescription("請在下列選單中選擇你所要提交的工單類型")
                    .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
                    row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                            .setCustomId('工單-問題')
                            .setPlaceholder("選擇工單類型")
                            .setOptions([
                                    {
                                        label: '工單:技術支援',
                                        value: '技術支援',
                                    },
                                    {
                                        label: '工單:申請與面試',
                                        value: '申請與面試',
                                    },
                                    {
                                        label: '工單:意見與建議',
                                        value: '意見與建議',
                                    },
                                    {
                                        label: '工單:其他問題',
                                        value: '其他問題',
                                    },
                                ])
                    )
                break;
        }
        try {
            await message.channel.send({embeds: [embed],components: [row] });
        } catch (error) {
            await message.channel.send(`${message.author} 指令發生錯誤，請重新檢查指令`);
        }
        await message.delete()
    }
};
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { Modal, showModal, TextInputComponent } = require('discord-modals')
const fs = require("fs")
let forms = {}
let answer = {}

fs.readFile('forms.json', function (err, data) {
    forms = JSON.parse(data)
});

module.exports = async (clients, modal) => {
    let database = JSON.parse(fs.readFileSync('database.json', function (){}))
    if (forms[modal.customId] != null && !/.*?-\d*/.test(modal.customId)) {
        let channelId = forms[modal.customId].channelId
        let roleTag = forms[modal.customId].roleTag
        let fields = []
        modal.fields.forEach((e, idx) => {
            fields.push({ name: (idx + 1) + ". " + e.customId, value: "> " + e.value })
        });
        const embed = new MessageEmbed()
            .setColor(0xe7ddb0)
            .setTitle(`已收到來自:\`${modal.user.username}#${modal.user.discriminator}\`的申請表。`)
            .setDescription(`<@${modal.user.id}> | \`${new Date().toLocaleString()}\`\n${forms[modal.customId].name}`)
            .addFields(fields)
            .setFooter({ text: 'Land of Edge | 邊陲之地 | 狀態待處理', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });

        const thankembed = new MessageEmbed()
            .setColor(0xe7ddb0)
            .setTitle(`感謝你申請了 Land of Edge | 邊陲之地\n${forms[modal.customId].name}`)
            .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil' });
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`接受-${modal.user.id}`)
                    .setLabel('接受')
                    .setStyle('SUCCESS')
                    .setEmoji('✅')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(`拒絕-${modal.user.id}`)
                    .setLabel('拒絕')
                    .setStyle('DANGER')
                    .setEmoji('❌')
            )   
        database[modal.customId].push(modal.user.id);
        fs.writeFileSync("database.json", JSON.stringify(database));
        client.channels.cache.get(channelId).send({ content:roleTag, embeds: [embed], components: [row] });
        modal.user.send({ embeds: [thankembed] });
        await modal.deferReply({ ephemeral: true })
        modal.followUp({ content: '申請已送出，請等待面試官回覆。', ephemeral: true })
    }

    if (/.*?-\d*/.test(modal.customId) && modal.customId.includes('移民申請')) {
        let page = modal.customId.split("-")[1]
        let data = forms[modal.customId.split("-")[0]]
        let TextInput = []
        answer[modal.user.id] = page == 1 ? modal.fields : answer[modal.user.id].concat(modal.fields)
        await modal.deferReply({ ephemeral: true })
        if (page != 3) {
            modal.followUp({
                content: '請填寫下列資料：', ephemeral: true, components: [new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setCustomId('前往下一頁')
                        .setLabel('前往下一頁')
                        .setStyle('SUCCESS'))]
            }).then((msg) => {
                msg.createMessageComponentCollector(m => m.author.id === modal.user.id, { time: 60000, conponentType: 'BUTTON' }).on('collect', async (res) => {
                    data.questions.slice(page * 5, page * 5 + 5).forEach((e, idx) => {
                        TextInput.push(new TextInputComponent()
                            .setCustomId(e)
                            .setLabel(e)
                            .setStyle(e.includes('100字以上') ? 'LONG' : 'SHORT')
                            .setMinLength(e.includes('100字以上') ? 100 : 0)
                            .setRequired(true)
                        )
                    });
                    showModal(new Modal()
                        .setCustomId(`移民申請-${parseInt(page) + 1}`)
                        .setTitle(`移民申請-${parseInt(page) + 1}`)
                        .addComponents(TextInput), { client: client, interaction: res })
                })
            })
        }
        else {
            let fields = []
            answer[modal.user.id].forEach((e, idx) => {
                fields.push({ name: e.customId, value: "> " + e.value })
            });
            const embed = new MessageEmbed()
            .setColor(0xe7ddb0)
            .setTitle(`已收到來自:\`${modal.user.username}#${modal.user.discriminator}\`的申請表。`)
            .setDescription(`<@${modal.user.id}> | \`${new Date().toLocaleString()}\`\n${data.name}`)
            .addFields(fields)
            .setFooter({ text: 'Land of Edge | 邊陲之地 | 狀態待處理', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });

        const thankembed = new MessageEmbed()
            .setColor(0xe7ddb0)
            .setTitle(`感謝你申請了 Land of Edge | 邊陲之地\n${data.name}`)
            .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`接受-${modal.user.id}`)
                    .setLabel('接受')
                    .setStyle('SUCCESS')
                    .setEmoji('✅')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(`拒絕-${modal.user.id}`)
                    .setLabel('拒絕')
                    .setStyle('DANGER')
                    .setEmoji('❌')
            )
        client.channels.cache.get(forms["移民申請"].channelId).send({ content:forms["移民申請"].roleTag ,embeds: [embed], components: [row] });
        modal.user.send({ embeds: [thankembed] });
        modal.followUp({ content: '申請已送出，請等待面試官回覆。', ephemeral: true })
        database["移民申請"].push(modal.user.id);
        fs.writeFileSync("database.json", JSON.stringify(database));
        }
    }

    if (/.*?-\d*/.test(modal.customId) && modal.customId.includes('執法人員申請')) {
        let page = modal.customId.split("-")[1]
        let data = forms[modal.customId.split("-")[0]]
        let TextInput = []
        answer[modal.user.id] = page == 1 ? modal.fields : answer[modal.user.id].concat(modal.fields)
        await modal.deferReply({ ephemeral: true })
        if (page != 2) {
            modal.followUp({
                content: '請填寫下列資料：', ephemeral: true, components: [new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setCustomId('前往下一頁')
                        .setLabel('前往下一頁')
                        .setStyle('SUCCESS'))]
            }).then((msg) => {
                msg.createMessageComponentCollector(m => m.author.id === modal.user.id, { time: 60000, conponentType: 'BUTTON' }).on('collect', async (res) => {
                    data.questions.slice(page * 5, page * 5 + 5).forEach((e, idx) => {
                        TextInput.push(new TextInputComponent()
                            .setCustomId(e)
                            .setLabel(e)
                            .setStyle(e.includes('100字以上') ? 'LONG' : 'SHORT')
                            .setMinLength(e.includes('100字以上') ? 100 : 0)
                            .setRequired(true)
                        )
                    });
                    showModal(new Modal()
                        .setCustomId(`執法人員申請-${parseInt(page) + 1}`)
                        .setTitle(`執法人員申請-${parseInt(page) + 1}`)
                        .addComponents(TextInput), { client: client, interaction: res })
                })
            })
        }
        else {
            let fields = []
            answer[modal.user.id].forEach((e, idx) => {
                fields.push({ name: e.customId, value: "> " + e.value })
            });
            const embed = new MessageEmbed()
            .setColor(0xe7ddb0)
            .setTitle(`已收到來自:\`${modal.user.username}#${modal.user.discriminator}\`的申請表。`)
            .setDescription(`<@${modal.user.id}> | \`${new Date().toLocaleString()}\`\n${data.name}`)
            .addFields(fields)
            .setFooter({ text: 'Land of Edge | 邊陲之地 | 狀態待處理', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });

        const thankembed = new MessageEmbed()
            .setColor(0xe7ddb0)
            .setTitle(`感謝你申請了 Land of Edge | 邊陲之地\n${data.name}`)
            .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`接受-${modal.user.id}`)
                    .setLabel('接受')
                    .setStyle('SUCCESS')
                    .setEmoji('✅')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(`拒絕-${modal.user.id}`)
                    .setLabel('拒絕')
                    .setStyle('DANGER')
                    .setEmoji('❌')
            )
        client.channels.cache.get(forms["執法人員申請"].channelId).send({ content:forms["執法人員申請"].roleTag ,embeds: [embed], components: [row] });
        modal.user.send({ embeds: [thankembed] });
        modal.followUp({ content: '申請已送出，請等待面試官回覆。', ephemeral: true })
        database["執法人員申請"].push(modal.user.id);
        fs.writeFileSync("database.json", JSON.stringify(database));
        }
    }
    
    if (/.*?-\d*/.test(modal.customId) && modal.customId.includes('工單')) {
        let type = modal.customId.split("-")[1]
        let user = modal.user
        let data = database["工單"][type]
		let CatChannel = data.catChannel
        let channel = await modal.guild.channels.create(`工單-${++database["工單"]["工單數量"]}`, {
        	type: "GUILD_TEXT",
        	parent: CatChannel,
        	permissionOverwrites: [
        		{
        			id: user.id,
        			allow: ["VIEW_CHANNEL","SEND_MESSAGES","ATTACH_FILES","READ_MESSAGE_HISTORY"],
        		},
        		{
        			id: modal.guild.roles.cache.get("986405179240894496"),
        			allow: ["VIEW_CHANNEL","SEND_MESSAGES","ATTACH_FILES","READ_MESSAGE_HISTORY"],
        		},
        		{
        			id: modal.guild.roles.everyone,
        			deny: ["VIEW_CHANNEL"],
        		}
        	],
        });
        database["工單"][type].channel[channel.id] = user.id
        let fields = []
        modal.fields.forEach((e, idx) => {
            fields.push({ name: e.customId, value: "> " + e.value })
        });
        const embed = new MessageEmbed()
        .setColor(0xe7ddb0)
        .setTitle(`已收到來自:\`${modal.user.username}#${modal.user.discriminator}\`的工單。`)
        .addFields(fields)
        .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil' });
        channel.send({ content:`${forms["工單-問題"].roleTag}`,embeds: [embed] })
        await modal.deferReply({ ephemeral: true })
        modal.followUp({ content: `已創建<#${channel.id}>`, ephemeral: true })
        fs.writeFileSync("database.json", JSON.stringify(database));
    }

    if (/.*?-\d*/.test(modal.customId) && modal.customId.includes('拒絕原因')) {
		bruh = modal.customId.split("-")
		msg = modal.message
        reason = modal.fields[0].value
        const embed = msg.embeds[0]
        department = embed.description.split("\n")[1]
        embed.color = 0xDB4939
        embed.description += `\n處理人: <@${modal.user.id}> | ❌ 原因:${reason}`
        embed.footer.text = embed.footer.text.replace("狀態待處理", "狀態已拒絕")
        try {
            user = client.users.cache.get(bruh[1])
            await user.send({
                embeds: [new MessageEmbed()
                    .setColor(0xE74D3C)
                    .setTitle("拒絕申請通知")
                    .setDescription(`${department} 已拒絕你的申請\n理由是:\`${reason}\`\n若有任何異議請創建工單詢問, 請勿私訊管理員`)
                    .setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png'})
                ]
            })
        } catch (error) {
            console.log(error)
        }
        modal.reply(`已嘗試通知 <@${bruh[1]}>，拒絕理由為: ${reason}`)
        if (forms['移民申請'].channelId != modal.channel.id) {
            msg.edit({ embeds: [embed], components: [] });
            setTimeout(() => {
                modal.deleteReply()
            }, 5000);
        }else{
            client.channels.cache.get(forms['移民申請'].alreadychannel).send({ embeds: [embed], components: [] });
            setTimeout(() => {
                modal.deleteReply()
                msg.delete()
            }, 5000);
        }
    }
};

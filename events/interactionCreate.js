const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} = require('discord.js');
const { Modal, showModal, TextInputComponent } = require('discord-modals')
const fs = require("fs")
let forms = {}

fs.readFile('forms.json', function (err, data) {
    forms = JSON.parse(data)
});

module.exports = async (client,interaction) => {
	let database = JSON.parse(fs.readFileSync('database.json', function (){}))
	let bruh = []
	if(interaction.customId.startsWith("close")){
		let deleteTicket = interaction.customId.split("-")[1] == "是" ? true : false
		if (deleteTicket) {
			embed = new MessageEmbed()
				.setColor(0xe7ddb0)
				.setTitle('工單已關閉') 
				.setDescription("此工單頻道將在五秒鐘後封存。")
				.setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' });
			interaction.update({embeds:[embed],components: []})
			setTimeout(async () => {
				if (interaction.customId.split("-")[3]!="") {
					try {
						await client.users.cache.get(interaction.customId.split("-")[2]).send({
							embeds: [new MessageEmbed()
								.setColor(0xE74D3C)
								.setTitle("工單關閉通知")
								.setDescription(`您的工單已被關閉，理由是：\`${interaction.customId.split("-").slice(3).join("-")}\``)
								.setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' })
							]
						})
					} catch (e) {
						console.log(e);
					}
				}
				for(e in database["工單"]){
					if (typeof database["工單"][e] != "object") continue;
					if (database["工單"][e].catChannel == interaction.message.channel.parentId) {
						if (database["工單"][e].channel[interaction.message.channel.id] != undefined) {
							let channel = client.channels.cache.get(interaction.message.channel.id)
							channel.setParent(forms["工單-問題"].archivecategory)
							channel.setName(channel.name.replace("工單-","工單-已封存-"))
							delete database["工單"][e].channel[interaction.message.channel.id]
						}
					}
				}
				fs.writeFileSync("database.json", JSON.stringify(database));
			}, 5000)
		}else{
			interaction.message.delete()
		}
		return
	}
	if(interaction.customId.startsWith("工單") && interaction.isSelectMenu()){
		switch (interaction.customId.split("-")[1]) {
			case "問題":
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
				data = forms["工單-問題"]
				TextInput = []
				data.questions.forEach(e => {
					TextInput.push(new TextInputComponent()
					.setCustomId(e)
					.setLabel(e)
					.setStyle('SHORT')
					.setRequired(true)
					)
				});
				modal = new Modal()
				.setCustomId(`工單-${interaction.values[0]}`)
				.setTitle(`工單-${interaction.values[0]}`)
				.addComponents(TextInput)
				showModal(modal, {
					client: client, 
					interaction: interaction 
					})
				await interaction.message.edit({components: [row]})
				break;
			case "市民":
				row = new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId('工單-市民')
							.setPlaceholder("選擇工單類型")
							.setOptions([
									{
										label: '創建組織申請工單',
										value: '組織申請',
									},
									{
										label: '創建民營職業申請工單',
										value: '民營職業',
									},
									{
										label: '主動市民案件申請工單',
										value: '主動市民',
									}
								])
					)
					data = forms[interaction.values[0]]
					TextInput = []
					data.questions.forEach((e, idx) => {
						if (idx >= 5) return;
						TextInput.push(new TextInputComponent()
						.setCustomId(e)
						.setLabel(e)
				  		.setStyle(e.includes('100字以上') ? 'LONG' : 'SHORT')
				  		.setMinLength(e.includes('100字以上') ? 100 : 0)
						.setRequired(true)
						)
					});
					modal = new Modal()
					.setCustomId(`${interaction.customId}-${interaction.values[0]}-1`)
					.setTitle(`${interaction.customId}-${interaction.values[0]}-1`)
					.addComponents(TextInput)
					showModal(modal, {
						client: client, 
						interaction: interaction 
					  })
					await interaction.message.edit({components: [row]})
				break;
		}
	}

    if (!interaction.isButton()) return;
	if (forms[interaction.customId] != null && interaction.customId != "移民申請" && interaction.customId != "執法人員申請"){
        let data = forms[interaction.customId]
		if (database[interaction.customId].indexOf(interaction.user.id) != -1) return interaction.reply({embeds : [new MessageEmbed()
			.setColor(0xE74D3C)
			.setTitle("你已經申請過，請勿再次重複申請") 
			.setDescription(`若有任何異議請創建工單詢問, 請勿私訊管理員`)
			.setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' })
			], ephemeral: true});
		let TextInput = []
		data.questions.forEach(e => {
			TextInput.push(new TextInputComponent()
			.setCustomId(e)
			.setLabel(e)
			.setStyle(e.includes('100字以上') ? 'LONG' : 'SHORT')
			.setMinLength(e.includes('100字以上') ? 100 : 0)
			.setRequired(true)
            )
        });
		const modal = new Modal()
		.setCustomId(interaction.customId)
		.setTitle(interaction.customId)
		.addComponents(TextInput)
		showModal(modal, {
			client: client, 
			interaction: interaction 
		  })
	}
	if (interaction.customId == "移民申請"){
		let data = forms[interaction.customId]
		let TextInput = []
		data.questions.forEach((e, idx) => {
			if (idx >= 5) return;
			TextInput.push(new TextInputComponent()
			.setCustomId(e)
			.setLabel(e)
      .setStyle(e.includes('100字以上') ? 'LONG' : 'SHORT')
      .setMinLength(e.includes('100字以上') ? 100 : 0)
			.setRequired(true)
			)
        });
		const modal = new Modal()
		.setCustomId(`${interaction.customId}-1`)
		.setTitle(interaction.customId)
		.addComponents(TextInput)
		showModal(modal, {
			client: client, 
			interaction: interaction 
		  })
	}
	if (interaction.customId == "執法人員申請"){
		let data = forms[interaction.customId]
		let TextInput = []
		data.questions.forEach((e, idx) => {
			if (idx >= 5) return;
			TextInput.push(new TextInputComponent()
			.setCustomId(e)
			.setLabel(e)
			.setStyle(e.includes('100字以上') ? 'LONG' : 'SHORT')
			.setMinLength(e.includes('100字以上') ? 100 : 0)
			.setRequired(true)
			)
        });
		const modal = new Modal()
		.setCustomId(`${interaction.customId}-1`)
		.setTitle(interaction.customId)
		.addComponents(TextInput)
		showModal(modal, {
			client: client, 
			interaction: interaction 
		  })
	}
	let bla = []
	if (/.*?-\d*/.test(interaction.customId) && interaction.customId.split("-")[0] != "拒絕原因"){
		bla = interaction.customId.split("-")
		user = client.users.cache.get(bla[1])
		msg = interaction.message
		let database = JSON.parse(fs.readFileSync('database.json', function (){}))
		let fuck = ""
		for (const key in forms) {
			if (key == "工單-問題") continue
			if (forms[key].channelId == interaction.channel.id) fuck = key
		}
        database[fuck].splice(database[fuck].indexOf(bla[1]),1);
		fs.writeFileSync("database.json", JSON.stringify(database));
		if (bla[0] == "接受") {
			const embed = msg.embeds[0]
			department = embed.description.split("\n")[1]
			embed.color = 0x00C70D
			embed.description += `\n處理人: <@${interaction.user.id}> | ✅`
			embed.footer.text = embed.footer.text.replace("狀態待處理", "狀態已接受")
			if (forms['移民申請'].channelId != interaction.channel.id) {
				msg.edit({ embeds: [embed], components: [] });
			}else{
				msg.delete()
				client.channels.cache.get(forms['移民申請'].alreadychannel).send({ embeds: [embed], components: [] });
			}
			try {
				await user.send({embeds : [new MessageEmbed()
				.setColor(0x00c70)
				.setTitle("接受申請通知") 
				.setDescription(`${department} 已接受你的申請\n若有任何異議請創建工單詢問, 請勿私訊管理員`)
				.setFooter({ text: 'Land of Edge | 邊陲之地 | developed by Johnnnny, SmallDevil', iconURL: 'https://cdn.discordapp.com/attachments/981967018502803516/982027612631220296/LOE.png' })
				]})
			} catch (error) {
				console.log(error)
			}
		}
		if (bla[0] == "拒絕") {
			data = forms["面試拒絕"]
			TextInput = []
			data.questions.forEach(e => {
				TextInput.push(new TextInputComponent()
				.setCustomId(e)
				.setLabel(e)
				.setStyle('SHORT')
				.setRequired(true)
				)
			});
			modal = new Modal()
			.setCustomId(`拒絕原因-${bla[1]}`)
			.setTitle(`輸入拒絕原因`)
			.addComponents(TextInput)
			showModal(modal, {
				client: client, 
				interaction: interaction 
			})
		}
	}
};

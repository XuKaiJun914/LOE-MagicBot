module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    const DJ = client.config.opt.DJ;

    if (cmd && DJ.enabled && !DJ.commands.includes(cmd.name)) {
        let fuck = true        
        DJ.roleName.forEach(e=>{
            const roleDJ = message.guild.roles.cache.find(x => x.name == e);
            if (message.member._roles.includes(roleDJ.id)) fuck = false
        })
        if (fuck){
            message.reply("❌你沒有權限使用這個指令").then(msg=>{
                setTimeout(() => {
                    msg.delete()
                    message.delete();
                }, 5000);
            })
            return;
        }
    }

    if (cmd) cmd.execute(client, message, args);
};
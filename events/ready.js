const fs = require('fs')

module.exports = async (client) => {
    console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);

    client.user.setActivity(client.config.app.playing);

    setInterval(function () {
        let database = JSON.parse(fs.readFileSync('database.json', function (){}));
        let now = Date.now();
        for (e in database["贊助身份組"]) {
            if (now > database["贊助身份組"][e]) {
                let member = client.guilds.cache.get("984520817528426516").members.cache.get(e);
                member.roles.remove("984533383738699777");
                delete database["贊助身份組"][e]; 
        }
    }
    fs.writeFileSync("database.json", JSON.stringify(database));
    },60000)
};

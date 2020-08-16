var randomHex = require('random-hex');
const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require('../config.json');
const fetch = require('node-fetch')
var CronJob = require('cron').CronJob;

async function cron() {
    const job = new CronJob('30 15 * * *', async function () {
        var data = db.all()
        var guilds = []
        for (var i = 0; i < data.length; i++) {
            guilds[i] = data[i].ID
        }
        for (var i = 1; i < guilds.length; i++) {
            console.log(db.has(`${guilds[i]}`))
            const data = db.get(`${guilds[i]}`)
            console.log(db.get(`${guilds[i]}.timestamp`))
            if (db.get(`${guilds[i]}.webhookID`) !== 'None') {
                const webhookClient = new Discord.WebhookClient(data.webhookID, data.webhookToken);

                const options = {
                    method: 'GET',
                }

                await fetch('https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats', options)
                    .then(async res => await res.json())
                    .then(async json => {
                        console.log(json.data)
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`**Covid19 World Stats (Updated on \`${json.data.last_update}\`)**`)
                            .setColor('#79d70f')
                            .setDescription(`Total Cases - \`${json.data.total_cases}\`\nTotal Recovery Cases - \`${json.data.recovery_cases}\`\nTotal Deaths - \`${json.data.death_cases}\`\nTotal Active Cases - \`${json.data.currently_infected}\``)
                            .setTimestamp()
                            .setFooter('White2001#0530')

                        await webhookClient.send({
                            username: 'Covid19-Tracker',
                            avatarURL: 'https://i.gyazo.com/b9a4dbab24bfaac44007d96325c6907c.jpg',
                            embeds: [embed],
                        });
                    })
                await fetch(`https://api.thevirustracker.com/free-api?countryTimeline=${data.country}`, options)
                    .then(async res => await res.json())
                    .then(async json => {
                        var json_data = json.timelineitems[0]
                        var dates = Object.keys(json_data)
                        var date = dates[dates.length - 2]
                        let col = randomHex.generate()
                        const country_embed = new Discord.MessageEmbed()
                            .setTitle(`**Covid19 ${json.countrytimelinedata[0].info.title} Stats on \`${date}\`**`)
                            .setColor(`${col}`)
                            .setDescription(`Total Cases - \`${json_data[`${date}`].total_cases}\`\nTotal Recoveries - \`${json_data[`${date}`].total_recoveries}\`\nTotal Deaths - \`${json_data[`${date}`].total_deaths}\`\nNew Daily Cases - \`${json_data[`${date}`].new_daily_cases}\`\nNew Daily Deaths - \`${json_data[`${date}`].new_daily_deaths}\``)
                            .setTimestamp()
                            .setThumbnail(`https://www.countryflags.io/${data.country}/shiny/64.png`)
                            .setFooter('White2001#0530')

                        await webhookClient.send({
                            username: 'Covid19-Tracker',
                            avatarURL: 'https://i.gyazo.com/b9a4dbab24bfaac44007d96325c6907c.jpg',
                            embeds: [country_embed],
                        });
                        db.set(`${guilds[i]}.timestamp`, `${Math.floor(new Date().getTime() / 1000) + 86400}`)
                    })
            }
        }
    });
    job.start()

}
module.exports = { cron }

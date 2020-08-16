var randomHex = require('random-hex');
const db = require('quick.db');
const Discord = require('discord.js');
const { prefix } = require('../config.json');
const fetch = require('node-fetch')

module.exports = {
    name: 'stats',
    description: 'Display Stats',
    cooldown: 3,
    usage: '<CountryCode>',
    guildOnly: true,
    args: true,
    async execute(message, args) {
        var data = db.get(`${message.guild.id}`)
        if (!data) {
            function e_invalid() {
                return new Discord.MessageEmbed()
                    .setColor('#d40808')
                    .setDescription(`Your server didn't setup. \nuse ${prefix}setup to setup your server.`)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        const options = {
            method: 'GET',
        }
        await fetch(`https://api.thevirustracker.com/free-api?countryTimeline=${args}`, options)
            .then(async res => await res.json())
            .then(async json => {
                if (json.results) {
                    function e_invalid() {
                        return new Discord.MessageEmbed()
                            .setColor('#d40808')
                            .setDescription(`Invalid Country Code.\nPlease recheck and try again`)
                            .setTimestamp()
                            .setFooter('White2001#0530');
                    }
                    return message.channel.send(e_invalid())
                }
                else {
                    var json_data = json.timelineitems[0]
                    var dates = Object.keys(json_data)
                    var date = dates[dates.length - 2]
                    let col = randomHex.generate()
                    const country_embed = new Discord.MessageEmbed()
                        .setTitle(`**Covid19 ${json.countrytimelinedata[0].info.title} Stats on \`${date}\`**`)
                        .setColor(`${col}`)
                        .setDescription(`Total Cases - \`${json_data[`${date}`].total_cases}\`\nTotal Recoveries - \`${json_data[`${date}`].total_recoveries}\`\nTotal Deaths - \`${json_data[`${date}`].total_deaths}\`\nNew Daily Cases - \`${json_data[`${date}`].new_daily_cases}\`\nNew Daily Deaths - \`${json_data[`${date}`].new_daily_deaths}\``)
                        .setTimestamp()
                        .setThumbnail(`https://www.countryflags.io/${args}/shiny/64.png`)
                        .setFooter('White2001#0530')

                    message.channel.send(country_embed)
                }
            })
    }
}

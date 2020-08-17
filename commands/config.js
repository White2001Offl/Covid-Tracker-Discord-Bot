var randomHex = require('random-hex');
const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require('../config.json');
const fetch = require('node-fetch')

module.exports = {
    name: 'config',
    description: 'A Configuration Menu',
    cooldown: 3,
    usage: '[option] [value]',
    guildOnly: true,
    async execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            function e_invalid() {
                return new Discord.MessageEmbed()
                    .setColor('#d40808')
                    .setDescription('Only ADMINISTRATOR Can run this command.')
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        let server = db.get(`${message.guild.id}`)
        var args = args + '';
        const splitArgs = args.split(',');
        const command1 = splitArgs.shift();
        const data2 = splitArgs.join();
        if (!server) {
            function e_invalid() {
                return new Discord.MessageEmbed()
                    .setColor('#d40808')
                    .setDescription(`Your server didn't setup. \nuse ${prefix}setup to setup your server.`)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        if (!args) {
            function e_invalid() {
                let col = randomHex.generate()
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setTitle(`${message.guild.name} Configuration`)
                    .addField(`${prefix}config country <CountryCode1,CountryCode2,......>`, `\`\`\`${server.country || 'None'}\`\`\``)
                    .addField(`${prefix}config channel <ChannelID>`, `\`\`\`${server.channel}\`\`\``)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        else if (command1 === 'country') {
            if (!data2) {
                function e_invalid() {
                    return new Discord.MessageEmbed()
                        .setColor('#d40808')
                        .setDescription(`You didn't passed any country code.`)
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                return message.channel.send(e_invalid())
            }
            var country = data2.split(',');
            var errors = []
            var valid = []
            console.log(country)
            const options = {
                method: 'GET',
            }
            for (var i = 0; i < country.length; i++) {
                await fetch(`https://api.thevirustracker.com/free-api?countryTimeline=${country[i]}`, options)
                    .then(async res => await res.json())
                    .then(async json => {
                        if (json.results) {
                            errors[errors.length] = country[i]
                        }
                        else {
                            valid[valid.length] = country[i]
                        }
                    })
            }
            if (valid.length > 0) {
                var valids = valid.join()
                db.set(`${message.guild.id}.country`, `${valids}`)
                function e_invalid() {
                    let col = randomHex.generate()
                    return new Discord.MessageEmbed()
                        .setColor(`${col}`)
                        .setDescription(`Data Updated Successfully :white_check_mark:\nThese are the data added \`${valid.join()}\``)
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                message.channel.send(e_invalid())
            }
            if (errors.length > 0) {
                function e_invalid() {
                    return new Discord.MessageEmbed()
                        .setColor('#d40808')
                        .setDescription(`Some Invalid Country Codes Entered, which was removed.\nHere are those \`${errors.join()}\``)
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                message.channel.send(e_invalid())
            }
        }
        else if (command1 === 'channel') {
            if (!data2) {
                function e_invalid() {
                    return new Discord.MessageEmbed()
                        .setColor('#d40808')
                        .setDescription(`You didn't passed any channel ID`)
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                return message.channel.send(e_invalid())
            }
            var channel = client.channels.cache.get(`${data2}`);
            if (!channel) {
                function e_invalid() {
                    return new Discord.MessageEmbed()
                        .setColor('#d40808')
                        .setDescription(`Invalid Channel ID`)
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                return message.channel.send(e_invalid())
            }
            if (db.get(`${message.guild.id}.channel`) === `${data2}`) {
                function e_invalid() {
                    return new Discord.MessageEmbed()
                        .setColor('#d40808')
                        .setDescription(`You Already have a webhook in that Channel`)
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                return message.channel.send(e_invalid())
            }
            await channel.createWebhook('Covid19-Tracker', {
                avatar: 'https://i.gyazo.com/b9a4dbab24bfaac44007d96325c6907c.jpg',
            }).then(webhook => {
                db.set(`${message.guild.id}.webhookID`, `${webhook.id}`)
                db.set(`${message.guild.id}.webhookToken`, `${webhook.token}`)
            }).catch(console.error);
            db.set(`${message.guild.id}.channel`, `${data2}`)
            function e_invalid() {
                let col = randomHex.generate()
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setDescription(`Data Updated Successfully :white_check_mark:`)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
    }
}

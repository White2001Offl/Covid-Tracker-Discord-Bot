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
                    .addField(`${prefix}config country <CountryCode>`, `\`\`\`${server.country}\`\`\``)
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
            const options = {
                method: 'GET',
            }
            await fetch(`https://api.thevirustracker.com/free-api?countryTimeline=${data2}`, options)
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
                        db.set(`${message.guild.id}.country`, `${data2}`)
                        db.set(`${message.guild.id}.timestamp`, `${Math.floor(new Date().getTime() / 1000) + 3600}`)
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
                })
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

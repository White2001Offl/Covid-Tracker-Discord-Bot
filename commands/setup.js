var randomHex = require('random-hex');
const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');

module.exports = {
    name: 'setup',
    description: 'Helps to Setup Server',
    cooldown: 3,
    usage: '',
    guildOnly: true,
    execute(message, args) {
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

        if (!db.has(`${message.guild.id}`)) {
            db.set(`${message.guild.id}`, { country: 'None', channel: 'None', webhookID: 'None', webhookToken: 'None' })
            let col = randomHex.generate()
            function e_invalid() {
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setTitle('Setup Success')
                    .setDescription('Your server setup has been successfully done.')
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            message.channel.send(e_invalid())
        }
        else {
            let col = randomHex.generate()
            function e_invalid() {
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setDescription('your server has already been setup.')
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            message.channel.send(e_invalid())
        }
    }
}

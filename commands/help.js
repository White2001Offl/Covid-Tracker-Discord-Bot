var randomHex = require('random-hex');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Displays Help Menu',
    cooldown: 3,
    usage: '[command] [commandName]',
    guildOnly: true,
    async execute(message, args) {
        const { commands } = message.client
        if (args.length === 0) {
            function e_invalid() {
                let col = randomHex.generate();
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setDescription(`\`${prefix}help setup\` - Shows how to setup your bot\n\`${prefix}help commands\` - Shows the list of commands\n\`${prefix}help commands <commandName>\` - To show detailed view about that specific command`)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        else if (args[0] === 'setup') {
            function e_invalid() {
                let col = randomHex.generate();
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setDescription(`1 . Run \`${prefix}setup\` To setup your server\n2 . Then access your server configuration with \`${prefix}config\``)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        else if (args[0] === 'commands' && !args[1]) {
            function e_invalid() {
                let col = randomHex.generate();
                return new Discord.MessageEmbed()
                    .setColor(`${col}`)
                    .setDescription(`\`${prefix}help\` - To show help menu\n\`${prefix}setup\` - To Setup your Discord server\n\`${prefix}config\` - Shows Server Configuration\n\`${prefix}stats <CountryCode>\` - Displays the current record cases of that Country`)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }
            return message.channel.send(e_invalid())
        }
        else if (args[0] === 'commands' && args[1]) {
            const name = args[1].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                function e_invalid() {
                    return new Discord.MessageEmbed()
                        .setColor('#d40808')
                        .setDescription('Invalid Command')
                        .setTimestamp()
                        .setFooter('White2001#0530');
                }
                return message.channel.send(e_invalid())
            }

            function e_invalid() {
                return new Discord.MessageEmbed()
                    .setColor('#79d70f')
                    .setTitle(`<> - Compulsory , [] - Optional`)
                    .setDescription(`**Name:** ${command.name}\n**Description:** ${command.description}\n**Usage:** ${prefix}${command.name} ${command.usage || ''}\n**Args:** ${command.args || false}\n**GuildOnly:** ${command.guildOnly || false}\n**Cooldown:** ${command.cooldown || 3} second(s)`)
                    .setTimestamp()
                    .setFooter('White2001#0530');
            }

            return message.channel.send(e_invalid())
        }
    }
}

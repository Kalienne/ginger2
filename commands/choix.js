const Discord = require('discord.js');
const Command = require('./command')
const prefix = '!k'

module.exports = class choix extends Command {



	static match(message) {
		return message.content.startsWith(prefix + '8ball')
	}

	static action(message) {

		let randnum = Math.floor(Math.random() * 5)

		if (randnum == 0) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Oui')
			.setFooter('le 8ball de Kalieno !')
			message.channel.sendEmbed(embed)

		} else if(randnum == 1) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Non')
			.setFooter('le 8ball de Kalieno !')
			message.channel.sendEmbed(embed)

		} else if(randnum == 2) { 
            
            var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Je ne sais pas ')
			.setFooter('le 8ball de Kalieno !')
            message.channel.sendEmbed(embed)
            
        } else if(randnum == 3) { 
            
            var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Probablement oui')
			.setFooter('le 8ball de Kalieno !')
            message.channel.sendEmbed(embed)
            
        } else if(randnum == 4) { 
            
            var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Probablement non')
			.setFooter('le 8ball de Kalieno !')
            message.channel.sendEmbed(embed) 
        }
    }    
}    
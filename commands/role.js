const Discord = require('discord.js')
const Command = require('./command')
const prefix = '!k'

module.exports = class Role extends Command {

	static match(message) {
		return message.content.startsWith(prefix + 'role')
	}

	static action(message) {

		//Add role
		if (message.content.startsWith(prefix + 'role -dev')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Développeur'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Développeur", "Role Développeur ajouté avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith(prefix + 'role -youtubeur')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Youtubeur'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Youtubeur", "Role Youtubeur ajouté avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith(prefix + 'role -debile')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Débile'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Débile", "Role Débile ajouté avec succès")
			message.channel.send(embed)

		}  else if(message.content.startsWith(prefix + 'role -graphiste')) {

			message.member.addRole(message.member.guild.roles.find('name', 'GFX'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Graphiste", "Role Graphiste ajouté avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith(prefix + 'role -gamer')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Gamer'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Gamer", "Role Gamer ajouté avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith(prefix + 'role -gentil')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Gentil'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Gentil", "Role Gentil ajouté avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith(prefix + 'role -roux')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Roux'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Roux", "Role Roux ajouté avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith(prefix + 'role -francais')) {

			message.member.addRole(message.member.guild.roles.find('name', 'Français'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Français", "Role Français ajouté avec succès")
			message.channel.send(embed)

		}





		//Remove role
		if (message.content.startsWith('!krole --dev')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Développeur'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Développeur", "Role Développeur retiré avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith('!krole --youtubeur')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Youtubeur'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Youtubeur", "Role Youtubeur retiré avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith('!krole --debile')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Débile'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Débile", "Role Débile retiré avec succès")
			message.channel.send(embed)

		}  else if(message.content.startsWith('!krole --graphiste')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'GFX'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Graphiste", "Role Graphiste retiré avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith('!krole --gamer')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Gamer'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Gamer", "Role Gamer retiré avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith('!krole --roux')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Roux'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Roux", "Role Roux retiré avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith('!krole --francais')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Français'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Français", "Role Français retiré avec succès")
			message.channel.send(embed)

		} else if(message.content.startsWith('!krole --gentil')) {

			message.member.removeRole(message.member.guild.roles.find('name', 'Gentil'));

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.addField("Role Gentil", "Gentil-end retiré avec succès")
			message.channel.send(embed)
		}


		}
}

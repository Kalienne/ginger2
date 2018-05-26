const Discord = require('discord.js');
const Command = require('./command')
const prefix = '!k'

module.exports = class Blague extends Command {



	static match(message) {
		return message.content.startsWith(prefix + 'blague')
	}

	static action(message) {

		let randnum = Math.floor(Math.random() * 14)

		if (randnum == 0) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Maman, maman, maman ! C\'est quoi un transexuel ? \n Heu... je t\'expliquerai ça quant tu seras plus grand. Oh \! Et puis arrête de m’appeler maman, ça m\'agace !')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 1) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Papa papa pourquoi mamie cours en zigzag dans le jardin? \n Tais-toi fiston, tu vois bien que j\'essaie de viser juste :smiley:')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 2) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Docteur j\'ai mal à l\'oeil gauche quand je bois mon café \n Essayez d\'enlever la cuillère de la tasse.')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 3) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Un gars entre dans un pet shop et dit au vendeur: \n Je veux un chien pour ma femme. \n Je m\'excuse monsieur, on prend pas les échanges\! ')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 4) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Qu\'est ce qui court et qui se jette ? \n UNE COURGETTE.')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 5) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Un geek ne descend pas du métro. Il libère la RAM...')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 6) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('A quoi sert Internet Explorer ? \n A télécharger Google Chrome.')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 7) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Qu\'est ce qui est rose, gluant et qui se balade de lianes en lianes ? \n UN CHEWING-GUM COLLÉ AU CUL DE TARZAN ')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 8) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Qu\'est ce que ton meilleur ami qui brûle ? \n UN POT-AU-FEU (pote au feu). ')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 9) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('Qu\'est-ce qui sépare l\'homme de l\'animal ?  \n  la Méditerranée .')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 10) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription('C\'est un terroriste qui veut detruire L\'empire Stats Bulding en delta plane.\n Bilan : 1 mort.')
			.setFooter('Les meilleurs blagues de Kalieno et de loin ')
			message.channel.sendEmbed(embed)

		} else if(randnum == 11) {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.setDescription('Comment as été ta journée, Paul ? \n C\'était vraiment cool maman ! Aujourd\'hui à l\'école on a fait des explosifs ! \n Ooh, ils en font des trucs à l\'école de nos jours. Et qu\'est-ce que tu vas faire à l\'école demain ? \n Quelle école ?')
		.setFooter('Les meilleurs blagues de Kalieno et de loin ')
		message.channel.sendEmbed(embed)

	} else if(randnum == 12) {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.setDescription('C\'est l\'histoire d\'un roux qui se balade avec un pote... Non je déconne !')
		.setFooter('Les meilleurs blagues de Kalieno et de loin ')
		message.channel.sendEmbed(embed)

	} else if(randnum == 13) {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.setDescription('Un roux ne prend pas feu. Il routit.')
		.setFooter('Les meilleurs blagues de Kalieno et de loin ')
		message.channel.sendEmbed(embed)

	} else if(randnum == 14) {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.setDescription('Un homme se rend chez le garagiste et lui demande : \n  Pouvez-vous réparer ma roue ? \n  Bien sûr, mais comment avez-vous fait pour la crever ? n\  J’ai roulé sur une bouteille. n\ Vous ne l’aviez pas vue ?? n\ Non, le mec l’avait dans la poche.')
		.setFooter('Les meilleurs blagues de Kalieno et de loin ')
message.channel.sendEmbed(embed) 
		}

	}



}

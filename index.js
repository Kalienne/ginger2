const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {)))))))
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

client.login(process.env.TOKEN);

client.on('message', function (message) {
    if (message.content === '!khelp') {
    const embed = {
 "title": "Aide des commandes:",
 "description": "``Le préfixe du bot est !k``",
 "color": 0x0066FE,
 "fields": [
  {
   "name": "!krandom",
   "value": "``Le créateur du bot vas tout les jours mettre une musique ou bruit random sur cette commande !``"
  },
  {
    "name": "!kporn",
    "value": "``Cette commande sert a rechercher quelque chose pour vous sur PornHub !``"
  },
  {
    "name": "!kfonda",
    "value": "``Cette commande sert a satisfaire l'égaux du créateur !``"
  },
  {
    "name": "!kgoogle (votre recherche)",
    "value": "``Cette commande sert a rechercher quelque chose pour vous sur google !``"
  },
  {
  "name": "!khelp",
  "value": "``C'est pour voir toutes les commendes du bot ! ps: certaine commandes sont caché , si tu les retrouve tu gagnera de l'xp ;)``"
  },
  {
  "name": "!kplay",
  "value": "``C'est pour pouvoir lancer une musique a partir d'une recherche youtube !``"
  },
  {
"name": "!kyt",
"value": "``Cette commandes permet de faire apparaitre la chaîne de mon créateur``"
},
{
"name": "!ksmiley",
"value": "`Cette commande permet de faire rire le bot`"
  },
  {
    "name": "!kxp",
    "value": "`Cette commande permet de voir l'xp que tu as`"
  },
        {
          "name": "!kfungif",
          "value": "`Cette commande permet d'afficher des gif animé !`"
            },
            {
                "name": "!kblague",
                "value": "`Cette commande permet d'envoyer une blague aléatoirement !`"
                  },
                  {
                      "name": "!ksay",
                      "value": "`Cette commande permet d'envoyer un message avec le bot`"
                        },
                        {
                            "name": "!kstats",
                            "value": "`Cette commande permet d'afficher les stats du serveur`"
                              },
                              {
                                  "name": "!kall_roles",
                                  "value": "`Cette commande permet d'afficher les roles disponible`"
                                    },
                                    {
                                      "name": "!k8ball",
                                      "value": "`Cette commande permet de repondre a une question posé !`"
                                        },
                                        {
                                          "name": "!kclear",
                                          "value": "`supprime autant de message que vous le désirez !`"
                                            },                  
{
  "name": "Invite le bot !",
  "value": "https://discordapp.com/oauth2/authorize?client_id=449627403195514890&scope=bot&permissions=2105015551"
},
{
"name": "Serveur du créateur !",
"value": "https://discord.gg/JNG9W2x"
}
 ]
}
message.channel.send({ embed })
    }
})

const PornHub = require('./commands/porn')
const Help = require('./commands/help')
const fonda = require('./commands/fonda')
const Google = require('./commands/google')
const Random = require('./commands/random')
const Youtube = require('./commands/youtube')
const Smiley = require('./commands/smiley')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const FunGif = require('./commands/fungif')
const Blague = require('./commands/blague')
const Say = require('./commands/say')
const Role = require('./commands/role')
const choix = require('./commands/choix')
const clear = require('./commands/clear')
const recherche = require('./commands/recherche')
const moment = require('moment')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("!k")
var randnum = 0;
var dispatcher;


client.on('ready', () => {
  client.user.setPresence({ game: { name: 'Préfix : !k ', type: 0} });
  console.log("Bot ready !");
});

client.on('guildMemberAdd', function (member) {
  member.createDM().then(function (channel) {
    return channel.send('Bienvenue sur le channel ' + member.displayName)
  }).catch(console.error)
})

client.on('message', function (message) {
  let commandUsed =
  Help.parse(message) ||
  Google.parse(message) ||
  fonda.parse(message) ||
  PornHub.parse(message) ||
  Random.parse(message) ||
  Youtube.parse(message) ||
  Smiley.parse(message) ||
  FunGif.parse(message) ||
  Blague.parse(message) ||
  Say.parse(message) ||
  Role.parse(message) ||
  choix.parse(message) ||
  clear.parse(message) ||
  recherche.parse(message)
})

client.on('message', message => {

	var msgauthor = message.author.id;
  
	if(message.author.bot)return;
  
	if(!db.get("xp").find({user: msgauthor}).value()){
		db.get("xp").push({user: msgauthor, xp: 1}).write();
	}else{
		var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
		console.log(userxpdb);
		var userxp = Object.values(userxpdb)
		console.log(userxp)
		console.log(`Nombre d'xp: ${userxp[1]}`)
  
		db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
  
	  if (message.content === prefix + "xp"){
		var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
		var xpfinal = Object.values(xp);
		var xp_embed = new Discord.RichEmbed()
			.setTitle(`Stats des XP de ${message.author.username}`)
			.setColor('#F4D03F')
			.setDescription(`Affichage de l'XP de ${message.author.username}`)
			.addField("XP:", `${xpfinal[1]} xp`)
			.setFooter("Continue comme ça ! :p")
		message.channel.send({embed: xp_embed});
  
  }}})
  
  client.on('message', function(message) {
    if(message.content === prefix + 'stats') {
      var date_moment = moment(message.guild.createdAt)
		date_moment = date_moment.locale('fr')

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField('Statistiques du serveur Kalieno', 'Il y a actuellement ' + '**' + message.guild.channels.size + '**' +' channels dans ce serveur \nIl y a exactement ' + '**' + message.guild.members.size + '**' + ' membres dans ce serveur\nLe serveur a été crée le: ' + '**' + date_moment.format('DD MMM YYYY') + '** \nJe suis present dans ' + '**' + bot.guilds.size + '**' + ' serveurs')
		message.channel.send(embed).catch(console.error)

  }  else if(message.content === prefix + 'all_roles') {


		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField("Tous les roles disponibles", "-Développeur ->  !krole -dev\n-Youtubeur ->      !krole -youtubeur\n-Débile ->           !krole -debile\n-Graphiste ->      !krole -gfx\n-Gentil ->      !krole -gentil\n-Roux ->      !krole -roux\n-Français ->      !krole -francais\n-Gamer->           !krole -gamer")
		message.channel.send(embed).catch(console.error)

  }
})

const Command = require('./command')

module.exports = class Help extends Command {

  static match (message) {
    console.log('checking Help')
    return message.content.startsWith('!kaliennehelp')
  }

  static action (message) {
    message.channel.send("__**Merci de m'avoir rajouter , voici la liste des commandes !**__ , __*Le préfixe du bot est !k*__")
    message.channel.send("__**!khelp**__ , **Cette commande sert a afficher les commandes du bot !**")
    message.channel.send("__**!kgoogle (votre recherche)**__ , **Cette commande sert a rechercher quelque chose pour vous sur google !**")
    message.channel.send("__**!kfonda**__ , **Cette commande sert a satisfaire l'égaux du créateur !**")
    message.channel.send("__**!kporn**__ , **Cette commande sert a rechercher quelque chose pour vous sur PornHub !**")
    message.channel.send("__**!krandom**__ , **Le créateur du bot vas tout les jours mettre une musique ou bruit random sur cette commande !**")
    message.channel.send("__**!kplay (url musique youtube)**__ , **Cette commande permet de pouvoir lancer une musique youtube a partir de l'url donné !**")
    message.channel.send("__**!kyt**__ , **Cette commande permet de faire apparaitre la chaîne de mon créateur**")
    message.channel.send("__**!ksmiley**__ , **Cette commande permet de faire rire le bot**")
    message.channel.send("__**!kxp**__ , **Cette commande permet de voir l'xp que tu as**")
    message.channel.send("__**Voilà la liste des commandes , d'autres sont a venir ;)**__")
    }

  }

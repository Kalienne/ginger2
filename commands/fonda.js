const Command = require('./command')

module.exports = class fonda extends Command {

  static match (message) {
    console.log('checking fonda')
    return message.content.startsWith('!kfonda')
  }


  static action (message) {
    message.reply('Kalienne est le meilleur !')

  }

}

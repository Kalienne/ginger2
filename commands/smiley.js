const Command = require('./command')

module.exports = class Smiley extends Command {

  static match (message) {
    console.log('checking Smiley')
    return message.content.startsWith('!ksmiley')
  }


  static action (message) {
    message.reply(' :joy: :joy: :joy: ')
  }

}

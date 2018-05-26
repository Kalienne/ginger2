const Command = require('./command')

module.exports = class Google extends Command {

  static match (message) {
    console.log('checking google')
    return message.content.startsWith('!kgoogle')
  }


  static action (message) {
    let args = message.content.split(' ')
    args.shift()
    message.delete()
    message.reply('https://google.fr/#q=' + args.join('%20'))
  }

}

const Command = require('./command')

module.exports = class PornHub extends Command {

  static match (message) {
    console.log('checking porn')
    return message.content.startsWith('!kporn')
  }


  static action (message) {
    let args = message.content.split(' ')
    args.shift()
    message.delete()
    message.reply('https://fr.pornhub.com/video/search?search=' + args.join('%20'))
  }

}

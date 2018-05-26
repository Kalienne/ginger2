const Command = require('./command')

module.exports = class recherche extends Command {

  static match (message) {
    console.log('checking recherche')
    return message.content.startsWith('!kyoutube')
  }


  static action (message) {
    let args = message.content.split(' ')
    args.shift()
    message.delete()
    message.channel.send('!kplay https://www.youtube.com/results?search_query=' + args.join('+'))
    message.delete()
  }

}
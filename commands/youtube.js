const Command = require('./command')

module.exports = class Youtube extends Command {

  static match (message) {
    console.log('checking youtube')
    return message.content.startsWith('!kyt')
  }


  static action (message) {
    message.channel.send("Voici ma chaine youtube : https://www.youtube.com/channel/UCjukXGGsqIx9_EOaECjWZIQ?view_as=subscriber")

  }

}

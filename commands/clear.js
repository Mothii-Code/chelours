// const config = require('../config.json')
// const db = require('../db.json')
const Discord = require('discord.js')
const embeds = require('../embeds')
const {prefix} = require('../config.json')


module.exports = {
  name: 'clear',
  run : async msg => {

    
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      let args = msg.content.split(" ");

      if (args[1] == undefined) {
        msg.channel.send(embeds.erreurClearEmbed);
      } else if (args[1] >= 100) {
        msg.channel.send(embeds.erreurClearEmbedNombre100);
      } else {
        let number = parseInt(args[1]);
        msg.channel.bulkDelete(number + 1)  


        let time = 5
        let seconds = "secondes"

        const clearmsg = await msg.channel.send(`Les messages ont bien été supprimés, celui-ci sera automatiquement supprimé dans ${time} ${seconds}`)
        
        
        if (time > 0) {
          setInterval(() => {
            if (time > 0) {
              if (time == 2) {
                seconds = "seconde"
              }
              time -= 1
              var newClearMsg = `Les messages ont bien été supprimés, celui-ci sera automatiquement supprimé dans ${time} ${seconds}`
              clearmsg.edit(newClearMsg)
              
            }
            if (time == 0) {
              time = -1
              clearmsg.delete()
              clearInterval
            }
          } ,1000)
      
        }
      }
    } else {
      msg.channel.send(embeds.erreurPermissionEmbed);
    }

}
}
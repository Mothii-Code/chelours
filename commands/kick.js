// const config = require('../config.json')
// const db = require('../db.json')
const Discord = require('discord.js')
const embeds = require('../embeds')
const {prefix} = require('../config.json')


module.exports = {
  name: 'kick',
  run: msg => {    
    const args = msg.content.split(" ")

    if (msg.member.hasPermission("KICK_MEMBERS")) {
      let mention = msg.mentions.members.first();
      if (mention == undefined || mention.hasPermission("KICK_MEMBERS")) {
        msg.channel.send(embeds.erreurMembreEmbed);
      } else {
        if (mention.kickable) {
          if (args[2]) {
            var item = "";
            for (var i = 2; i < args.length; i++) {
              item += args[i] + " ";
            }} else {
              item = "Pas de raison"
            }
            mention.kick();
            const kickEmbed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setAuthor(`${mention.user.tag} à été kick`, `https://cdn.discordapp.com/avatars/${mention.user.id}/${mention.user.avatar}.png?size=256`)
              .setDescription("**Raison : **" + item)
            msg.channel.send(kickEmbed);

        } else {
          const NoKickEmbedBot = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(":x: Je ne peux pas kick ce membre");
          msg.channel.send(NoKickEmbedBot);
        }
      }
    } else {

      msg.channel.send(embeds.erreurPermissionEmbed);
    }

}
}
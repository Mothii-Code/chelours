// const config = require('../config.json')
// const db = require('../db.json')
const Discord = require('discord.js')
const embeds = require('../embeds')
const {prefix} = require('../config.json')


module.exports = {
  name: 'ban',
  run: msg => {    
    const args = msg.content.split(" ")

    if (msg.member.hasPermission("BAN_MEMBERS")) {
      let mention = msg.mentions.members.first();
      if (mention == undefined || mention.hasPermission("BAN_MEMBERS")) {
        msg.channel.send(embeds.erreurMembreEmbed);
      } else {
        if (mention.bannable) {
          if (args[2]) {
            var item = "";
            for (var i = 2; i < args.length; i++) {
              item += args[i] + " ";
            }} else {
              item = "Pas de raison"
            }
            mention.ban();
            const banEmbed = new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setAuthor(`${mention.user.tag} à été banni(e)`, `https://cdn.discordapp.com/avatars/${mention.user.id}/${mention.user.avatar}.png?size=256`)
              .setDescription("**Raison : **" + item)
            msg.channel.send(banEmbed);

        } else {
          const NobanEmbedBot = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(":x: Je ne peux pas bannir ce membre");
          msg.channel.send(NobanEmbedBot);
        }
      }
    } else {

      msg.channel.send(embeds.erreurPermissionEmbed);
    }

}
}
// const config = require('../config.json')
// const db = require('../db.json')
const Discord = require('discord.js')
const embeds = require('../embeds')
const {prefix} = require('../config.json')
const ms = require('ms')


module.exports = {
  name: 'tempban',
  run: msg => {    
    const args = msg.content.split(" ")

    if (msg.member.hasPermission("BAN_MEMBERS")) {
      let mention = msg.mentions.members.first();
      if (mention == undefined) {
        msg.channel.send(embeds.erreurMembreEmbed);
      } else {
        if (mention.hasPermission("BAN_MEMBERS")) {return msg.channel.send(embeds.erreurPermissionEmbed);}
        if (mention.bannable) {
          if (args[3]) {
            var item = "";
            for (var i = 3; i < args.length; i++) {
              item += args[i] + " ";
            }} else {
              item = "Pas de raison"
            }
            mention.ban();
            setTimeout(function() {
              msg.guild.members.unban(`${mention}`)
            },ms(args[2]) )
            
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
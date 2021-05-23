// const config = require('../config.json')
// const db = require('../db.json')
const Discord = require('discord.js')
const embeds = require('../embeds')
const {prefix} = require('../config.json')


module.exports = {
  name: 'pp',
  run: msg => {

    const args = msg.content.split(" ")
    
		if (args[1]) {
      let mention = msg.mentions.members.first();
      
      if (mention == undefined) {
        msg.channel.send(embeds.erreurMembreEmbed);
      } else {
      const ppEmbed = new Discord.MessageEmbed()
      .setColor('#EEA6B4')
      .setImage( `https://cdn.discordapp.com/avatars/${mention.user.id}/${mention.user.avatar}.png?size=256`)
      .addField(`**Voici la photo de profil de ${mention.user.tag}**` , `Pour avoir l\'image originale, [clique ici](https://cdn.discordapp.com/avatars/${mention.user.id}/${mention.user.avatar})`)
			msg.channel.send(ppEmbed)	
    }}
		else {
      let user = msg.author;  
      const ppEmbed = new Discord.MessageEmbed()
      .setColor('#EEA6B4')
      .setImage( `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
      .addField('Voici ta photo de profil', `Pour avoir l\'image originale, [clique ici](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar})`)
			msg.channel.send(ppEmbed)
		}

}
}
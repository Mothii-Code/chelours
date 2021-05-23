// const config = require('../config.json')
// const db = require('../db.json')
const Discord = require('discord.js')
const embeds = require('../embeds')
const {prefix} = require('../config.json')

module.exports = {
  name: 'help',
  run: msg => {
		if (msg.content == prefix + 'help') {
			msg.reply('📜 | Je t\'ai envoyé la liste des commandes en mp')
			msg.author.send(embeds.helpEmbed)}
		
		else if (msg.content == prefix + 'help here') {
			msg.channel.send(embeds.helpEmbed)
		}
}
}
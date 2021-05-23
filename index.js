const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    config = require('./config.json'),
    fs = require('fs')
 
client.login(config.token)
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection();

 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on("ready", () => {
  console.log("Bot opérationnel")
  client.user.setPresence({
    activity: {
      name: "le developpement",
      type: "WATCHING",
    },
  });
})

client.on('message', msg => {


  if (msg.content == "!join") {
    const newEmbed = new Discord.MessageEmbed()
    .setTitle("Chelours")
    .setColor("#EEA6B4")
    .setTitle("Chelours")
    .setThumbnail("https://i.imgur.com/bVGEgOv.png")
    .addFields(
      { name: '<:cl_checkmark:845067702317350932> Commandes', value: 'Fait `-help` pour avoir une liste de mes commandes !' },
      { name: "<:cl_interrogation:845067701838938122> Toujours besois d'aide ?", value: "[Clique ici](https://discord.gg/3KX6kGZcND) pour venir sur notre discord"},
    )
    msg.channel.send("Merci de m'avoir ajouté <3 !", newEmbed)
  }

    if (msg.type !== 'DEFAULT' || msg.author.bot) return
 
    const args = msg.content.split(" ")
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(msg, args, client)
})

client.on('guildCreate', guild => {
  const newEmbed = new Discord.MessageEmbed()
  .setTitle("Chelours")
  .setColor("#EEA6B4")
  .setTitle("Chelours")
  .setThumbnail("https://i.imgur.com/bVGEgOv.png")
  .addFields(
    { name: '<:cl_checkmark:845067702317350932> Commandes', value: 'Fait `-help` ou `-help here` pour avoir une liste de mes commandes !' },
    { name: "<:cl_interrogation:845067701838938122> Toujours besois d'aide ?", value: "[Clique ici](https://discord.gg/3KX6kGZcND) pour rejoindre notre discord"},
  )
  guild.systemChannel.send("Merci de m'avoir ajouté <3 !", newEmbed)
});

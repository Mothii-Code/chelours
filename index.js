const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true
    }),
    {TOKEN, prefix} = require('./config.json'),
    fs = require('fs')
 
client.login(TOKEN)
client.commands = new Discord.Collection()
 
client.on("ready", () => {
  console.log('Bot opérationnel')
})

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})
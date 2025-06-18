const { Client, GatewayIntentBits } = require('discord.js');
require ('dotenv').config();
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent 
    ] });


client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}`);
});

client.on('messageCreate', message => {
    
        console.log(`\n\nrecive author ${message.author.id} - ${message.author.tag}`);
        console.log(`recive channel ${message.channel.id} - ${message.channel.name}`);
        console.log(`recive content ${message.content}`);

    if (message.author.bot) {
        return
    }

    if (message.content == 't!'){
        message.reply(`mensagem recebida ${message.author.tag}`);
    }

});

client.login(process.env.TOKEN);

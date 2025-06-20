import ChannelService from './service/ChannelService.js';
import RuleService from './service/RuleService.js';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] });

const channelService = new ChannelService(client);
const ruleService = new RuleService(client);

client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}`);
});


client.on('messageCreate', message => {
    console.log(`\n\nrecive author ${message.author.id} - ${message.author.tag}`);
    console.log(`recive channel ${message.channel.id} - ${message.channel.name}`);
    console.log(`recive content ${message.content}`);

    if(message.content.startsWith('!channelPrivate'))
        channelService.createChannel(message);

    if(message.content.startsWith('!channelAccess'))
        channelService.permitirAcesso(message);

    if(message.content.startsWith('!ruleCreate'))
        ruleService.createRule(message);

    if(message.content.startsWith('!ruleAccess'))
        ruleService.permitirAcesso(message);

    if (message.author.bot) {
        return
    }

    if (message.content == 't!'){
        message.reply(`mensagem recebida ${message.author}`);
    }

});

client.login(process.env.TOKEN);

import ChannelService from './service/ChannelService.js';
import RuleService from './service/RuleService.js';
import DmService from './service/DmService.js';
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
    partials: ['CHANNEL']
 });

const channelService = new ChannelService(client);
const ruleService = new RuleService(client);
const dmService = new DmService(client);

client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}`);
});


client.on('messageCreate', async (message) => {
    console.log(`\n\nrecive author ${message.author.id} - ${message.author.tag}`);
    console.log(`recive channel ${message.channel.id} - ${message.channel.name}`);
    console.log(`recive content ${message.content}`);

    if (message.author.bot) return;

    if (message.channel.type == 1) {
        if(message.content.startsWith('!teste')){
            dmService.teste(message)
        }

        if(message.content.startsWith('!config')){
        }
        
    }

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

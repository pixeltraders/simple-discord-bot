import fs from 'node:fs';
import path from 'node:path'
import { fileURLToPath } from 'url';
import ChannelService from './service/ChannelService.js';
import RuleService from './service/RuleService.js';
import DmService from './service/DmService.js';
import * as pingCommand from './commands/ping.js';
import { Client, Collection, Events, GatewayIntentBits, Partials, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel]
 });

client.commands = new Collection();
const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

console.log(foldersPath)

for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = await import(`file://${filePath}`);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        console.warn(`[AVISO] O comando em ${filePath} está sem "data" ou "execute".`);
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


const channelService = new ChannelService(client);
const ruleService = new RuleService(client);
const dmService = new DmService(client);

client.once('ready', () => {
    console.log(`Bot online como ${client.user.tag}`);
});

client.commands.set(pingCommand.data.name, pingCommand);



client.on('messageCreate', async (message) => {
    console.log(`\n\nrecive author ${message.author.id} - ${message.author.tag}`);
    console.log(`recive channel ${message.channel.id} - ${message.channel.name}`);
    console.log(`recive guild ${message.guild.id} - ${message.guild.name}`);

    console.log(`recive content ${message.content}`);

    if (message.author.bot) return;

    if (message.channel.type == 1) {
        if(message.content.startsWith('!teste')){
            dmService.teste(message)
        }

        if(message.content.startsWith('!config')){
        }
        
        if(message.content.startsWith('!url')){
            dmService.url(message)
        }

    }

    if(message.content.startsWith('!commandsConfig')){
        try {
            console.log('🔄 Atualizando comandos de barra...');
            console.log(client.id)
            await rest.put(Routes.applicationGuildCommands(client.user.id, message.guild.id), {
            body: commands,
        });
            console.log('✅ Comandos registrados com sucesso!');
            message.reply('✅ Comandos registrados com sucesso!')
        } catch (error) {
            
            console.error('❌ Erro ao registrar comandos:', error);
            message.reply('❌ Erro ao registrar comandos')
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

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    console.log(`Comandos indentificados: ${interaction.commandName}`)

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Erro ao executar comando.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);

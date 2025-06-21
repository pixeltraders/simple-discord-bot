import { SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com Pong!')
  
export async function execute(interaction) {
    await interaction.reply('🏓 Pong!');
}
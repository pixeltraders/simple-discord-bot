import { PermissionsBitField } from 'discord.js'

class ChannelService {  
    constructor (client){
        this.client = client
    }
    
    async createChannel(message){
        const membro = message.mentions.members.first();
        if (!membro) {
            return message.reply('Mencione um usuário.');
        }
        
        const canal = await message.guild.channels.create(
            {
                name:`private-${membro.user.username}`,
                type: 0,
                permissionOverwrites:
                [
                    {
                        id: message.guild.roles.everyone, 
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: membro.id, 
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages
                        ] 
                    },
                    {
                        id: message.author.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel
                        ]
                    },
                    {
                    id: this.client.user.id, 
                    allow: [
                        PermissionsBitField.Flags.ViewChannel
                    ]
                }
                ],
            }
        );
        message.channel.send(`Canal privado criado: ${canal}`);
    }

   async permitirAcesso(message){
        const [_, canalId, userMention] = message.content.split(' ');
        const canal = message.guild.channels.cache.get(canalId.replace(/[<#>]/g, ''));
        const membro = message.mentions.members.first();
      
         if (!canal || !membro) return message.reply('Canal ou usuário inválido.');

         await canal.permissionOverwrites.edit(membro.id, {
            ViewChannel: true,
            SendMessages: true
        });

         message.reply(`Permissões adicionadas para ${membro.user} no canal ${canal}.`);
   }

}

export default ChannelService;
import { PermissionsBitField } from 'discord.js'

class RuleService {  
    constructor (client){
        this.client = client
    }


    async createRule(message){
        const arg = message.content.split(' ');
        const nomeCargo = arg[1];

        if (!nomeCargo) return message.reply('comando deve ser `!ruleCreate nome-do-cargo`');
        
        const cargo = await message.guild.roles.create({

            name:nomeCargo,
            color: 'Random',
            permissions:[
                PermissionsBitField.Flags.SendMessages,
                PermissionsBitField.Flags.ViewChannel
            ]
        })

        message.reply(`Cargo criado: ${cargo}`)
    }

    async permitirAcesso(message){
        const cargo = message.mentions.roles.first();
        const membro = message.mentions.members.first();
        if (!membro || !cargo) {
            return message.reply('comando deve ser `!ruleAccess @usuario @cargo`')
        }

        await membro.roles.add(cargo);

        message.reply(`cargo ${cargo} adicionado ao ${membro} `)
    }

    
}

export default RuleService
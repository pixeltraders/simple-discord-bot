class MessageService {  
    constructor (client){
        this.client = client
    }

    async UserCheck(message){
        let countMessages = 0;
        let ultimaMensagemId = null;
        const membro = message.mentions.members.first();
        const channel = message.guild.channels.cache.find(c => c.name === 'check') || message.mentions.channels.first();

        if (!membro) {
            return message.reply('Mencione um usuário.');
        }

        if (!channel) {
            return message.reply('Servidor não encontrado. Mencione um canal válido.');
        }

        while (true) {
        const mensagens = await channel.messages.fetch({
            limit: 100,

            ...(ultimaMensagemId && { before: ultimaMensagemId })
        });
        
        if (mensagens.size === 0) break;

        countMessages += mensagens.filter(msg => msg.author.id == membro.id).size;
        ultimaMensagemId = mensagens.last().id;
    }

        return message.reply(`O usuário ${membro} enviou ${countMessages} mensagens!`);
    }
    
    
}

export default MessageService
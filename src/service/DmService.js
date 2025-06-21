class DmService {

    constructor (client){
        this.client = client;
    }

    teste(message){
         message.reply(`mensagem recebida ${message.author}`);
    }

    url(message){
        const [_, idbot] = message.content.split(' ');
        if (!idbot){
            return message.reply(`não foi possivel achar o id`);
        }

        message.reply(`https://discord.com/oauth2/authorize?client_id=${idbot}&scope=bot+applications.commands&permissions=8`);
    }

    isConfig(message){

    }

    config(message){
        
    }
}

export default DmService
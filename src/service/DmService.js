class DmService {

    constructor (client){
        this.client = client;
    }

    teste(message){
         message.reply(`mensagem recebida ${message.author}`);
    }

    isConfig(message){

    }

    config(message){
        
    }
}

export default DmService
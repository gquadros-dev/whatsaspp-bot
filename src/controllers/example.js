import { Client } from 'whatsapp-web.js';


class Client {
  constructor(){
    this.client = new Client();
  }

  on(event, callback){
    this.client.on(event, callback);
  }
}

export default new Client();

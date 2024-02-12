const ww = require('whatsapp-web.js');

class Client {
  constructor(){
    this.client = new ww.Client();
  }

  on(event, callback){
    this.client.on(event, callback);
  }
}

module.exports = new Client();
const googleApi = require('googleapis');
const bot = require('./bot');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

client = bot.client;

bot.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

bot.on('ready', () => {
  console.log('Client is ready!');
});

bot.on('message', async (msg) => {
  const chats = require('../chats.json').chats;
  let chat = await msg.getChat();

  for (let i = 0; i < chats.length; i++) {
    if (chat.name === chats[i]){
      if (msg.hasMedia) {
        const _media = await msg.downloadMedia();

        if(_media.mimetype === 'application/pdf') {
          try {
            const auth = new googleApi.google.auth.GoogleAuth({
              keyFile: './googleDrive.json',
              scopes: ['https://www.googleapis.com/auth/drive']
            });

            const driveService = googleApi.google.drive({
              version: 'v3',
              auth
            });

            const file = {
              fileMetaData: {
                name: _media.filename,
                parents: ["1Yepp1OXH-NvVncCZ6K3_51N-GckrW3Tv"],
              },
              media: {
                mimeType: 'application/pdf',
                body: _media.data.toString('base64'),
              }
            }

            const buffer = Buffer.from(file.media.body, 'base64');
            fs.writeFile(`./src/files/${file.fileMetaData.name}`, buffer, (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
            });

            await driveService.files.create({
              requestBody: {
                name: file.fileMetaData.name,
                parents: file.fileMetaData.parents,
              },
              media: {
                mimeType: file.media.mimeType,
                body: fs.createReadStream(`./src/files/${file.fileMetaData.name}`)
              },
              fields: 'id',
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
}); 

client.initialize();
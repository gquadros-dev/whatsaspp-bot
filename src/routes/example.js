import express from 'express';
import qrcode from 'qrcode-terminal';
import example from '../controllers/example';

const router = express.Router();

router.get('/', () => {
  example.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR RECEIVED', qr);
  });

  example.on('ready', () => {
    console.log('Client is ready!');
  });

  example.on('message', (message) => {
    const content = message.body;
    if (content === 'Hi') {
      example.sendMessage(message.from, 'Hello, how can I help you?');
    }
  });

  example.initialize();
});

export default router;

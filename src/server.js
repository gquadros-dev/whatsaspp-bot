import app from './app';
import dotenv from 'dotenv';

dotenv.config();

app.on('pronto', () => {
  app.listen(process.env.PORT, () =>{
    console.log(`Acessar http://localhost:${process.env.PORT}`);
  });
});

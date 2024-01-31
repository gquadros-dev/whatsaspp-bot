import dotenv from 'dotenv';

dotenv.config();

import express, { urlencoded, json } from 'express';
import flash from 'connect-flash';

import exampleRoutes from './routes/example.js';
import { initDb, getDb } from './db/connection.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.connectMongoose();
  }

  middlewares() {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(flash());
  }

  routes() {
    this.app.use('/', exampleRoutes);
  }

  connectMongoose() {
    initDb((err, db) => {
      if (err) {
        console.log(err);
      } else {
        this.app.emit('pronto');
      }
    });
  }
}

export default new App().app;
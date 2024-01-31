import { MongoClient } from 'mongodb';
const url = process.env.CONNECTIONSTRING;

let _db;

const initDb = callback => {
  MongoClient.connect(url)
    .then(client => {
      _db = client;
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
}

const getDb = () => {
  return _db;
}

export { initDb, getDb };

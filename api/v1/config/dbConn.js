require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

let db;

const connectDB = async (callback) => {
  try {
    await client.connect();
  } catch (error) {
    callback(error);
  }

  db = client.db('sample_products');

  return db === undefined ? false : true;
};

const getDB = () => {
  return db;
};

module.exports = { connectDB, getDB };

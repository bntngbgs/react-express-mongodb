const { MongoClient } = require('mongodb');

const uri = 'mongodb://userAdmin:root123@localhost:27017/?authSource=admin';
const client = new MongoClient(uri);

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

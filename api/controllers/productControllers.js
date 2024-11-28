const dbconn = require('../config/dbConn');
const { ObjectId } = require('mongodb');

const getAllProducts = (req, res) => {
  let db = dbconn.getDB();

  db.collection('products')
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    });
};

const getProduct = (req, res) => {
  let db = dbconn.getDB();

  db.collection('products')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((data) => {
      if (!data) return res.status(404).send({ msg: 'Product not found' });
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.send('Not found');
    });
};

const createProduct = (req, res) => {
  let db = dbconn.getDB();
  let product = req.body;

  db.collection('products')
    .insertOne(product)
    .then((result) => {
      res.send(result);
      console.log('operation succeed');
    });
};

const updateProduct = (req, res) => {
  let db = dbconn.getDB();
  let product = req.body;
  let query = { _id: new ObjectId(req.params.id) };

  let update = {
    $set: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      status: product.status,
      image_url: product.image_url,
    },
  };

  db.collection('products')
    .updateOne(query, update)
    .then((result) => {
      res.send(result);
      console.log('success');
    })
    .catch((error) => {
      res.send(error);
    });
};

const deleteProduct = (req, res) => {
  let db = dbconn.getDB();

  db.collection('products')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send('error');
    });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

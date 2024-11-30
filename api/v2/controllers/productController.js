const Product = require('../models/productModel');
const { objectId } = require('mongoose');

const createProduct = async (req, res) => {
  const { name, price, stock, status, image_url } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      stock,
      status,
      image_url,
    });

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    if (!products) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({ msg: 'Product not found' });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { ...req.body });

    if (!product) {
      return res.status(400).send({ msg: 'Error: cannot update' });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).send({ msg: 'Error, failed to delete product' });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

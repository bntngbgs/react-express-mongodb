const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/products', getAllProduct);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;

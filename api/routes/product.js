const express = require('express');
const router = express.Router();
const product = require('../controllers/productControllers');

router.get('/api/products', product.getAllProducts);
router.get('/api/products/:id', product.getProduct);
router.post('/api/products', product.createProduct);
router.put('/api/products/:id', product.updateProduct);
router.delete('/api/products/:id', product.deleteProduct);

module.exports = router;

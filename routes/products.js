const express = require('express');
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { createInventoryTransaction } = require('../controllers/inventoryController');

const router = express.Router();

router.route('/products')
    .post(createProduct)
    .get(getAllProducts)

router.route('/products/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

router.route('/products/:id/stock')
.post(createInventoryTransaction)


module.exports = router;
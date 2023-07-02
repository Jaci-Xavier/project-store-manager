const route = require('express').Router();

const { productController } = require('../controllers/index');

route.get('/', productController.getAllProducts);

route.get('/:id', productController.getProductById);

route.post('/', productController.createProduct);

module.exports = route;
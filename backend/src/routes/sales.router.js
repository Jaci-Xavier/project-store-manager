const router = require('express').Router();
const { salesController } = require('../controllers/index');
const validateId = require('../middlewares/validate.id');
const validateQuantity = require('../middlewares/validate.quantity');

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', validateId, validateQuantity, salesController.createSale);

module.exports = router;

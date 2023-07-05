const router = require('express').Router();
const { salesController } = require('../controllers/index');
const allValidateId = require('../middlewares/all.validate.id');
const validateQuantity = require('../middlewares/validate.quantity');

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', allValidateId, validateQuantity, salesController.createSale);

module.exports = router;

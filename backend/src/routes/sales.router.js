const router = require('express').Router();
const { salesController } = require('../controllers/index');

router.post('/', salesController.createSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;

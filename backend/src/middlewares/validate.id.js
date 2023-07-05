const services = require('../services/products.services');

const validateId = async (req, res, next) => {
  const allProducts = await services.getAllProducts();

  const allIds = allProducts.data.map((product) => product.id);

  const allReqIds = req.body.map((product) => product.productId);
  
  const saleId = allReqIds.every((id) => allIds.includes(id));
  
  const validateRequired = allReqIds.some((id) => id === undefined);

  if (validateRequired) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!saleId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = validateId;

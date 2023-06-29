const productsServices = require('../services/products.services');

const getAllProducts = async (_req, res) => {
  const { data } = await productsServices.getAllProducts();
  return res.status(200).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { data } = await productsServices.getProductById(id);
  res.status(200).json(data);
};

module.exports = {
  getAllProducts,
  getProductById,
};
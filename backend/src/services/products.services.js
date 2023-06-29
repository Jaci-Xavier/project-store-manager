const { getAll, getById } = require('../models/products.model');

const getAllProducts = async () => {
  const products = await getAll();
  return { status: 'SUCESSFUL', data: products };
};

const getProductById = async (id) => {
  const product = await getById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
const { getAll, getById, create, update } = require('../models/products.model');

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

const createProduct = async (name) => {
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }

  if (name.length < 5) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 5 characters long' } };
  }

  const product = await create(name);
  return { status: 'SUCCESSFUL', data: product };
};

const updateProduct = async (id, name) => {
  const productExists = await getById(id);
  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }

  if (name.length < 5) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 5 characters long' } };
  }

  const product = await update(id, name);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
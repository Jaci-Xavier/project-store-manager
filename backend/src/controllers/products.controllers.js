const productsServices = require('../services/products.services');

const getAllProducts = async (_req, res) => {
  const { data } = await productsServices.getAllProducts();
  return res.status(200).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsServices.getProductById(id);
  res.status(status === 'NOT_FOUND' ? 404 : 200).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsServices.createProduct(name);

  switch (status) {
    case 'BAD_REQUEST':
      return res.status(400).json(data);
    case 'UNPROCESSABLE_ENTITY':
      return res.status(422).json(data);
    default:
      return res.status(201).json(data);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsServices.updateProduct(Number(id), name);

  switch (status) {
    case 'BAD_REQUEST':
      return res.status(400).json(data);
    case 'UNPROCESSABLE_ENTITY':
      return res.status(422).json(data);
    case 'NOT_FOUND':
      return res.status(404).json(data);
    default:
      return res.status(200).json(data);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};

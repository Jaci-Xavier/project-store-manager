const models = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await models.getAll();
  return { status: 'SUCESSFUL', data: sales };
};

const getSaleById = async (id) => {
  const sale = await models.getById(id);
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCESSFUL', data: sale };
};

const createSale = async (newSale) => {
  const sale = await models.create(newSale);
  return { status: 'SUCESSFUL', data: sale };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
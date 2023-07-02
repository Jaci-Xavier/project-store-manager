const { getAll, getById } = require('../models/sales.model');

const getAllSales = async () => {
  const sales = await getAll();
  return { status: 'SUCESSFUL', data: sales };
};

const getSaleById = async (id) => {
  const sale = await getById(id);
  if (!sale) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCESSFUL', data: sale };
};

module.exports = {
  getAllSales,
  getSaleById,
};
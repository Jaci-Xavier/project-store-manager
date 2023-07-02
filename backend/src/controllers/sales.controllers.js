const salesService = require('../services/sales.services');

const getAllSales = async (_req, res) => {
  const { data } = await salesService.getAllSales();
  return res.status(200).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSaleById(id);
  res.status(status === 'NOT_FOUND' ? 404 : 200).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
};
const { salesService } = require('../services');

const openSales = async (_req, res) => {
    const data = await salesService.getAllSales();
    return res.status(200).json(data.data);
  };

const openSalesId = async (req, res) => {
    const id = Number(req.params.id);
    const data = await salesService.getIdSales(id);
    if (data.status !== 'SUCCESSFUL') return res.status(404).json(data.data);
    return res.status(200).json(data.data);
};  
  
  module.exports = {
    openSales,
    openSalesId,
  };
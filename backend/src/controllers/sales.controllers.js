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

const addSalesControllers = async (req, res) => {
    const itemsSold = req.body;

    const data = await salesService.addSalesService(itemsSold);
    if (data.status === 'BAD REQUEST') return res.status(400).json(data.data);
    if (data.status === 'UNPROCESSABLE ENTITY') return res.status(422).json(data.data);
    if (data.status === 'NOT FOUND') return res.status(404).json(data.data);
    return res.status(201).json(data.data);
};

  module.exports = {
    openSales,
    openSalesId,
    addSalesControllers,
  };
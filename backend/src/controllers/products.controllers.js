const { productsService } = require('../services');

const openProducts = async (_req, res) => {
    const data = await productsService.getAllProducts();
    return res.status(200).json(data.data);
  };

const openProductsId = async (req, res) => {
    const id = Number(req.params.id);
    const data = await productsService.getIdProducts(id);
    if (data.status !== 'SUCCESSFUL') return res.status(404).json(data.data);
    return res.status(200).json(data.data);
};

const addProducts = async (req, res) => {
  const { name } = req.body;
  const data = await productsService.serviceAddProducts(name);

  if (data.status === 'BAD REQUEST') return res.status(400).json(data.data);
    if (data.status === 'UNPROCESSABLE ENTITY') return res.status(422).json(data.data);
    
  return res.status(201).json(data.data);
};
  
  module.exports = {
    openProducts,
    openProductsId,
    addProducts,
  };
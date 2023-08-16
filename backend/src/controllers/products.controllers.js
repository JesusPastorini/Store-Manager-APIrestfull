const { productsService } = require('../services');

const openProducts = async (_req, res) => {
    const { data } = await productsService.getAllProducts();
    return res.status(200).json(data);
  };

const openProductsId = async (req, res) => {
    const id = Number(req.params.id);
    const { data } = await productsService.getIdProducts(id);
    if (data.status !== 'SUCCESSFULL') return res.status(404).json(data);
    return res.status(200).json(data);
};  
  
  module.exports = {
    openProducts,
    openProductsId,
  };
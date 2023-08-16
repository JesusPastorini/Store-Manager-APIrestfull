const { productsModel } = require('../models');

const getAllProducts = async () => {
    const data = await productsModel.findAll(); 
    return { status: 'SUCCESSFUL', data };
  };

const getIdProducts = async (Id) => {
    const data = await productsModel.findById(Id); 
    if (!data) return { status: 'NOT FOUND', data: { message: 'product not found' } };
    return { status: 'SUCCESSFUL', data };
}; 

  module.exports = {
    getAllProducts,
    getIdProducts,
  };
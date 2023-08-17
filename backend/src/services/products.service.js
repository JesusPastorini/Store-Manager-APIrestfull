const { productsModel } = require('../models');

const getAllProducts = async () => {
    const dataP = await productsModel.findAll(); 
    return { status: 'SUCCESSFUL', data: dataP };
  };

const getIdProducts = async (Id) => {
    const result = await productsModel.findById(Id); 
    if (!result) return { status: 'NOT FOUND', data: { message: 'Product not found' } };
    return { status: 'SUCCESSFUL', data: result };
};

const serviceAddProducts = async (product) => {
  const result = await productsModel.create(product);
  console.log(result); 
  if (!result) return { status: 'NOT FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: result };
};

  module.exports = {
    getAllProducts,
    getIdProducts,
    serviceAddProducts,
  };
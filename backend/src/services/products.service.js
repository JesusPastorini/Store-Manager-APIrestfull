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

const serviceAddProducts = async (name) => {
  if (!name) return { status: 'BAD REQUEST', data: { message: '"name" is required' } };

  if (name.length < 5) {
    return {
      status: 'UNPROCESSABLE ENTITY',
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }

  const result = await productsModel.create(name); 
  if (!result) return { status: 'NOT FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: result };
};

  module.exports = {
    getAllProducts,
    getIdProducts,
    serviceAddProducts,
  };
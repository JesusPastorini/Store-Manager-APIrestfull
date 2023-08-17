const { salesModel } = require('../models');

const getAllSales = async () => {
    const dataP = await salesModel.findAll(); 
    return { status: 'SUCCESSFUL', data: dataP };
  };

const getIdSales = async (Id) => {
    const result = await salesModel.findById(Id); 
    if (result.length === 0) return { status: 'NOT FOUND', data: { message: 'Sale not found' } };
    return { status: 'SUCCESSFUL', data: result };
}; 

  module.exports = {
    getAllSales,
    getIdSales,
  };
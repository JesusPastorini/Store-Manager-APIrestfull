const Joi = require('joi');
const { salesModel, productsModel } = require('../models');
const { salesItemSchema } = require('./schema');

const getAllSales = async () => {
    const dataP = await salesModel.findAll(); 
    return { status: 'SUCCESSFUL', data: dataP };
  };

const getIdSales = async (Id) => {
    const result = await salesModel.findById(Id); 
    if (result.length === 0) return { status: 'NOT FOUND', data: { message: 'Sale not found' } };
    return { status: 'SUCCESSFUL', data: result };
};

const validateSalesItems = (itemsSold) => {
  const { error } = Joi.array().items(salesItemSchema).validate(itemsSold);
  if (error) {
      const errorMessage = error.details[0].message;
      if (
          errorMessage === '"productId" is required'
          || errorMessage === '"quantity" is required'
      ) {
          return { status: 'BAD REQUEST', data: { message: errorMessage } };
      }
      return { status: 'UNPROCESSABLE ENTITY', data: { message: errorMessage } };
  }
  return null;
};

const checkProductsExistence = async (itemsSold) => {
  const productPromises = itemsSold.map(async (item) => {
      const product = await productsModel.findById(item.productId);
      if (!product) {
          return { status: 'NOT FOUND', data: { message: 'Product not found' } };
      }
      return null;
  });

  const productResults = await Promise.all(productPromises);

  const productsExistenceError = productResults.find((result) => result !== null);
  return productsExistenceError || null;
};

const addSalesService = async (itemsSold) => {
  const validationError = validateSalesItems(itemsSold);
  if (validationError) {
      return validationError;
  }

  const productsExistenceError = await checkProductsExistence(itemsSold);
  if (productsExistenceError) {
      return productsExistenceError;
  }

  const newSale = await salesModel.createSale();

  const saleItems = await Promise.all(itemsSold.map(async (item) => {
      const { productId, quantity } = item;
      await salesModel.createSaleProduct(newSale.id, productId, quantity);
      return { productId, quantity };
  }));

  return { status: 'SUCCESSFUL', data: { id: newSale.id, itemsSold: saleItems } };
};

  module.exports = {
    getAllSales,
    getIdSales,
    addSalesService,
  };
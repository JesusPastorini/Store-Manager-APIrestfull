const sinon = require('sinon');
const { expect } = require('chai');
const camelize = require('camelize');
const connection = require('../models/connection');

//const { findAll, findById } = require('../models');
const { productsModel } = require('../../../src/models');

describe('Teste para a função findAll', () => {
    it('deve retornar todos os produtos', async () => {
      const mockResult = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      sinon.stub(productsModel, 'findAll').resolves(mockResult);
  
      const result = await productsModel.findAll();
  
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      
    });
  });
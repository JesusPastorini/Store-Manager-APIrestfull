const sinon = require('sinon');
const { expect } = require('chai');
const camelize = require('camelize');
const connection = require('../models/connection');

const { findAll, findById } = require('../models');

describe('Teste para a função findAll', () => {
    let connectionStub, camelizeStub;
  
    before(() => {
      connectionStub = sinon.stub(connection, 'execute');
      camelizeStub = sinon.stub(camelize);
    });
  
    after(() => {
      connectionStub.restore();
      camelizeStub.restore();
    });
  
    it('deve retornar todos os produtos', async () => {
      const mockResult = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      connectionStub.returns([mockResult]);
      camelizeStub.returns(mockResult);
  
      const result = await findAll();
  
      expect(result).to.deep.equal(mockResult);
      expect(connectionStub.calledOnce).to.be.true;
      expect(camelizeStub.calledOnce).to.be.true;
    });
  });
  
  describe('Teste para a função findById', () => {
    let connectionStub, camelizeStub;
  
    before(() => {
      connectionStub = sinon.stub(connection, 'execute');
      camelizeStub = sinon.stub(camelize);
    });
  
    after(() => {
      connectionStub.restore();
      camelizeStub.restore();
    });
  
    it('deve retornar o produto com o id fornecido', async () => {
      const mockResult = { id: 1, name: 'Product 1' };
      connectionStub.returns([[mockResult]]);
      camelizeStub.returns(mockResult);
  
      const result = await findById(1);
  
      expect(result).to.deep.equal(mockResult);
      expect(connectionStub.calledOnce).to.be.true;
      expect(camelizeStub.calledOnce).to.be.true;
    });
  });
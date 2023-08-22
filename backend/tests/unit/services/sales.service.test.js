const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

describe('sales.service', function () {
  describe('getAllSales', function () {
    it('deve retornar status "SUCCESSFUL" e dados das vendas ao buscar todas as vendas', async function () {
      const mockData = [{ id: 1, amount: 100 }, { id: 2, amount: 150 }];
      sinon.stub(salesModel, 'findAll').resolves(mockData);

      const result = await salesService.getAllSales();

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(mockData);

      salesModel.findAll.restore();
    });
  });

  describe('getIdSales', function () {
    it('deve retornar status "SUCCESSFUL" e dados da venda ao buscar uma venda por ID existente', async function () {
      const idVenda = 1;
      const mockData = { id: idVenda, amount: 100 };
      sinon.stub(salesModel, 'findById').resolves(mockData);

      const result = await salesService.getIdSales(idVenda);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(mockData);

      salesModel.findById.restore();
    });

    it('deve retornar status "NOT FOUND" e mensagem de erro ao buscar uma venda por ID inexistente', async function () {
      const idVenda = 1;
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.getIdSales(idVenda);

      expect(result.status).to.equal('NOT FOUND');
      expect(result.data.message).to.equal('Sale not found');

      salesModel.findById.restore();
    });
  });

  describe('validateSalesItems', function () {
    it('deve retornar null se os itens da venda forem válidos', function () {
      const items = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }];
      const result = salesService.validateSalesItems(items);

      expect(result).to.equal(null);
    });

    it('deve retornar objeto de erro para itens de venda inválidos', function () {
      const items = [{ productId: 1 }, { quantity: 3 }];
      const result = salesService.validateSalesItems(items);

      expect(result.status).to.equal('BAD REQUEST');
      expect(result.data.message).to.equal('"quantity" is required');
    });
  });

  describe('checkProductsExistence', function () {
    it('deve retornar null se todos os produtos dos itens existirem', async function () {
      const items = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }];
      sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Produto 1' });

      const result = await salesService.checkProductsExistence(items);

      expect(result).to.equal(null);

      productsModel.findById.restore();
    });

    it('deve retornar objeto de erro se algum produto dos itens não existir', async function () {
      const items = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }];
      sinon.stub(productsModel, 'findById').resolves(null);

      const result = await salesService.checkProductsExistence(items);

      expect(result.status).to.equal('NOT FOUND');
      expect(result.data.message).to.equal('Product not found');

      productsModel.findById.restore();
    });
  });

  describe('addSalesService', function () {
    it('deve retornar status "SUCCESSFUL" e dados da venda adicionada', async function () {
      const mockItems = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }];
      const mockSale = { id: 1 };
      sinon.stub(salesModel, 'createSale').resolves(mockSale);
      sinon.stub(salesModel, 'createSaleProduct').resolves();

      const result = await salesService.addSalesService(mockItems);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data.id).to.equal(mockSale.id);

      salesModel.createSale.restore();
      salesModel.createSaleProduct.restore();
    });

    it('deve retornar objeto de erro para itens de venda inválidos', async function () {
      const mockItems = [{ quantity: 2 }, { productId: 2, quantity: 3 }];
      const result = await salesService.addSalesService(mockItems);

      expect(result.status).to.equal('BAD REQUEST');
      expect(result.data.message).to.equal('"productId" is required');
    });

    it('deve retornar objeto de erro se algum produto dos itens não existir', async function () {
      const mockItems = [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }];
      sinon.stub(productsModel, 'findById').resolves(null);

      const result = await salesService.addSalesService(mockItems);

      expect(result.status).to.equal('NOT FOUND');
      expect(result.data.message).to.equal('Product not found');

      productsModel.findById.restore();
    });
  });
});

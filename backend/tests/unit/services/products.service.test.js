const sinon = require('sinon');
const { expect } = require('chai');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

describe('products.service', function () {
  describe('getAllProducts', function () {
    it('deve retornar status "SUCCESSFUL" e dados dos produtos ao buscar todos os produtos', async function () {
      const mockData = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
      sinon.stub(productsModel, 'findAll').resolves(mockData);

      const result = await productsService.getAllProducts();

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(mockData);

      productsModel.findAll.restore();
    });
  });

  describe('getIdProducts', function () {
    it('deve retornar status "SUCCESSFUL" e dados do produto ao buscar um produto por ID existente', async function () {
      const idProduto = 1;
      const mockData = { id: idProduto, name: 'Produto 1' };
      sinon.stub(productsModel, 'findById').resolves(mockData);

      const result = await productsService.getIdProducts(idProduto);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(mockData);

      productsModel.findById.restore();
    });

    it('deve retornar status "NOT FOUND" e mensagem de erro ao buscar um produto por ID inexistente', async function () {
      const idProduto = 1;
      sinon.stub(productsModel, 'findById').resolves(null);

      const result = await productsService.getIdProducts(idProduto);

      expect(result.status).to.equal('NOT FOUND');
      expect(result.data.message).to.equal('Product not found');

      productsModel.findById.restore();
    });
  });

  describe('serviceAddProducts', function () {
    it('deve retornar status "SUCCESSFUL" e dados do produto adicionado', async function () {
      const nomeProduto = 'Produto Teste';
      const mockData = { id: 1, name: nomeProduto };
      sinon.stub(productsModel, 'create').resolves(mockData);

      const result = await productsService.serviceAddProducts(nomeProduto);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(mockData);

      productsModel.create.restore();
    });

    it('deve retornar status "BAD REQUEST" e mensagem de erro para requisição inválida', async function () {
      const result = await productsService.serviceAddProducts('');

      expect(result.status).to.equal('BAD REQUEST');
      expect(result.data.message).to.equal('"name" is required');
    });

    it('deve retornar status "UNPROCESSABLE ENTITY" e mensagem de erro para entidade não processável', async function () {
      const nomeProduto = 'Test';
      const result = await productsService.serviceAddProducts(nomeProduto);

      expect(result.status).to.equal('UNPROCESSABLE ENTITY');
      expect(result.data.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('deve retornar status "NOT FOUND" e mensagem de erro para produto não encontrado', async function () {
      const nomeProduto = 'Produto Teste';
      sinon.stub(productsModel, 'create').resolves(null);

      const result = await productsService.serviceAddProducts(nomeProduto);

      expect(result.status).to.equal('NOT FOUND');
      expect(result.data.message).to.equal('Product not found');

      productsModel.create.restore();
    });
  });

  describe('getProductById', function () {
    it('deve retornar os dados do produto pelo ID', async function () {
      const idProduto = 1;
      const mockData = { id: idProduto, name: 'Produto 1' };
      sinon.stub(productsModel, 'findById').resolves(mockData);

      const result = await productsService.getProductById(idProduto);

      expect(result).to.deep.equal(mockData);

      productsModel.findById.restore();
    });
  });

  describe('updateProduct', function () {
    it('deve retornar status "SUCCESSFUL" e dados do produto atualizado', async function () {
      const idProduto = 1;
      const nomeProduto = 'Produto Atualizado';
      const mockUpdatedProduct = { id: idProduto, name: nomeProduto };
      sinon.stub(productsModel, 'updateProduct').resolves(mockUpdatedProduct);

      const result = await productsService.updateProduct(idProduto, nomeProduto);

      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(mockUpdatedProduct);

      productsModel.updateProduct.restore();
    });

    it('deve retornar status "BAD REQUEST" e mensagem de erro para requisição inválida', async function () {
      const idProduto = 1;
      const result = await productsService.updateProduct(idProduto, '');

      expect(result.status).to.equal('BAD REQUEST');
      expect(result.data.message).to.equal('"name" is required');
    });

    it('Retornar status "UNPROCESSABLE ENTITY" e mensagem de erro para entidade não processável', async function () {
      const idProduto = 1;
      const nomeProduto = 'Test';
      const result = await productsService.updateProduct(idProduto, nomeProduto);

      expect(result.status).to.equal('UNPROCESSABLE ENTITY');
      expect(result.data.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('Retorna status "NOT FOUND" e mensagem de erro para produto não encontrado', async function () {
      const idProduto = 1;
      const nomeProduto = 'Produto Atualizado';
      sinon.stub(productsModel, 'updateProduct').resolves(null);

      const result = await productsService.updateProduct(idProduto, nomeProduto);

      expect(result.status).to.equal('NOT FOUND');
      expect(result.data.message).to.equal('Product not found');

      productsModel.updateProduct.restore();
    });
  });
});

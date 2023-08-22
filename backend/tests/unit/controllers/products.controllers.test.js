const sinon = require('sinon');
const { assert } = require('chai');
const { productsControler } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

describe('Products Controllers', function () {
  describe('openProducts', function () {
    it('Retorna uma lista com todos os produtos', async function () {
      const productsData = { data: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] };
      sinon.stub(productsService, 'getAllProducts').resolves(productsData);

      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await productsControler.openProducts({}, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(productsData.data));

      productsService.getAllProducts.restore();
    });
  });

  describe('openProductsId', function () {
    it('Deve retornar detalhes do produto quando o produto existir', async function () {
      const productId = 1;
      const mockData = { status: 'SUCCESSFUL', data: { id: productId, name: 'Product 1' } };
      sinon.stub(productsService, 'getIdProducts').resolves(mockData);

      const req = { params: { id: productId } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await productsControler.openProductsId(req, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(mockData.data));

      productsService.getIdProducts.restore();
    });

    it('Deve retornar o status 404 quando o produto não existe', async function () {
      const productId = 1;
      const mockData = { status: 'NOT FOUND', data: { message: 'Product not found' } };
      sinon.stub(productsService, 'getIdProducts').resolves(mockData);

      const req = { params: { id: productId } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await productsControler.openProductsId(req, res);

      assert(res.status.calledWith(404));
      assert(res.json.calledWith(mockData.data));

      productsService.getIdProducts.restore();
    });
  });

  describe('addProducts', function () {
    it('Retornar status 201 e os dados do produto ao adicionar um produto', async function () {
      const productName = 'New Product';
      const mockData = { status: 'SUCCESSFUL', data: { id: 3, name: productName } };
      sinon.stub(productsService, 'serviceAddProducts').resolves(mockData);

      const req = { body: { name: productName } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await productsControler.addProducts(req, res);

      assert(res.status.calledWith(201));
      assert(res.json.calledWith(mockData.data));

      productsService.serviceAddProducts.restore();
    });
  });

  describe('updateProduct', function () {
    it('Retorna o status 200 e os dados do produtoao atualizar um produto', async function () {
      const productId = 1;
      const updatedProductName = 'Updated Product';
      const mockData = { status: 'SUCCESSFUL', data: { id: productId, name: updatedProductName } };
      sinon.stub(productsService, 'updateProduct').resolves(mockData);

      const req = { params: { id: productId }, body: { name: updatedProductName } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await productsControler.updateProduct(req, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(mockData.data));

      productsService.updateProduct.restore();
    });

    it('Retorna 400 status e mensagem de erro para solicitação inválida', async function () {
      const productId = 1;
      const updatedProductName = 'Updated Product';
      const mockData = { message: '"name" is required' };
      sinon.stub(productsService, 'updateProduct').resolves({ status: 'BAD REQUEST', data: { message: mockData.message } });
  
      const req = { params: { id: productId }, body: { name: updatedProductName } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  
      await productsControler.updateProduct(req, res);
  
      assert(res.status.calledWith(400));
      assert(res.json.calledWith({ message: mockData.message }));
  
      productsService.updateProduct.restore();
    });
  
    it('Retorna status 422 e mensagem de erro para entidade não processável', async function () {
      const productId = 1;
      const updatedProductName = 'New';
      const mockData = { message: '"name" length must be at least 5 characters long' };
      sinon.stub(productsService, 'updateProduct').resolves({ status: 'UNPROCESSABLE ENTITY', data: { message: mockData.message } });
  
      const req = { params: { id: productId }, body: { name: updatedProductName } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  
      await productsControler.updateProduct(req, res);
  
      assert(res.status.calledWith(422));
      assert(res.json.calledWith({ message: mockData.message }));
  
      productsService.updateProduct.restore();
    });
  
    it('Retorna status 404 e mensagem de erro para não encontrado', async function () {
      const productId = 1;
      const updatedProductName = 'Updated Product';
      const mockData = { message: 'Product not found' };
      sinon.stub(productsService, 'updateProduct').resolves({ status: 'NOT FOUND', data: { message: mockData.message } });
  
      const req = { params: { id: productId }, body: { name: updatedProductName } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
  
      await productsControler.updateProduct(req, res);
  
      assert(res.status.calledWith(404));
      assert(res.json.calledWith({ message: mockData.message }));
  
      productsService.updateProduct.restore();
    });
  });
});

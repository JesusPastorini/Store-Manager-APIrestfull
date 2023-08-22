const sinon = require('sinon');
const { assert } = require('chai');
const { salesControler } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

describe('sales.controllers', function () {
  describe('openSales', function () {
    it('Retorna status 200 e dados das vendas ao buscar todas as vendas', async function () {
      const mockData = { status: 'SUCCESSFUL', data: { vendas: [{ id: 1 }, { id: 2 }] } };
      sinon.stub(salesService, 'getAllSales').resolves(mockData);

      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.openSales({}, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(mockData.data));

      salesService.getAllSales.restore();
    });
  });

  describe('openSalesId', function () {
    it('Retorna status 200 e dados da venda ao buscar uma venda específica por ID', async function () {
      const idVenda = 1;
      const mockData = { status: 'SUCCESSFUL', data: { id: idVenda } };
      sinon.stub(salesService, 'getIdSales').resolves(mockData);

      const req = { params: { id: idVenda } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.openSalesId(req, res);

      assert(res.status.calledWith(200));
      assert(res.json.calledWith(mockData.data));

      salesService.getIdSales.restore();
    });

    it('deve retornar status 404 e mensagem de erro ao não encontrar a venda', async function () {
      const idVenda = 1;
      const mockData = { status: 'NOT FOUND', data: { message: 'Venda não encontrada' } };
      sinon.stub(salesService, 'getIdSales').resolves(mockData);

      const req = { params: { id: idVenda } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.openSalesId(req, res);

      assert(res.status.calledWith(404));
      assert(res.json.calledWith(mockData.data));

      salesService.getIdSales.restore();
    });
  });

  describe('addSalesControllers', function () {
    it('Retornar status 201 e dados da venda adicionada', async function () {
      const mockData = { status: 'SUCCESSFUL', data: { id: 1 } };
      sinon.stub(salesService, 'addSalesService').resolves(mockData);

      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.addSalesControllers(req, res);

      assert(res.status.calledWith(201));
      assert(res.json.calledWith(mockData.data));

      salesService.addSalesService.restore();
    });

    it('Retorna status 400 e mensagem de erro para requisição inválida', async function () {
      const mockData = { status: 'BAD REQUEST', data: { message: 'Requisição inválida' } };
      sinon.stub(salesService, 'addSalesService').resolves(mockData);

      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.addSalesControllers(req, res);

      assert(res.status.calledWith(400));
      assert(res.json.calledWith(mockData.data));

      salesService.addSalesService.restore();
    });

    it('Retorna status 422 e mensagem de erro para entidade não processável', async function () {
      const mockData = { status: 'UNPROCESSABLE ENTITY', data: { message: 'Entidade não processável' } };
      sinon.stub(salesService, 'addSalesService').resolves(mockData);

      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.addSalesControllers(req, res);

      assert(res.status.calledWith(422));
      assert(res.json.calledWith(mockData.data));

      salesService.addSalesService.restore();
    });

    it('Retorna status 404 e mensagem de erro para não encontrado', async function () {
      const mockData = { status: 'NOT FOUND', data: { message: 'Não encontrado' } };
      sinon.stub(salesService, 'addSalesService').resolves(mockData);

      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await salesControler.addSalesControllers(req, res);

      assert(res.status.calledWith(404));
      assert(res.json.calledWith(mockData.data));

      salesService.addSalesService.restore();
    });
  });
});

const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

describe('Testes para as funções de models', function () {
    afterEach(function () {
        sinon.restore();
    });

    it('deve retornar vazio quando não há produtos', async function () {
        sinon.stub(connection, 'execute').resolves([[]]);

        const result = await productsModel.findAll();

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(0);
    });

    it('deve retornar todos os produtos', async function () {
        const mockResult = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
        sinon.stub(productsModel, 'findAll').resolves(mockResult);

        const result = await productsModel.findAll();

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
        expect(result).to.be.deep.equal(mockResult);
    });

    it('deve retornar o produto com o id fornecido', async function () {
        const mockResult = { id: 1, name: 'Produto 1' };
        sinon.stub(productsModel, 'findById').resolves(mockResult);

        const result = await productsModel.findById(1);

        expect(result).to.deep.equal(mockResult);
        expect(result).to.be.an('object');
    });
});

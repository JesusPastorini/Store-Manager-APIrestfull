const sinon = require('sinon');
const { expect } = require('chai');
const camelize = require('camelize');
const connection = require('../../../src/models/connection');

const { findAll, findById } = require('../../../src/models');

describe('Testes para as funções de models', function () {
    let connectionStub;
    let camelizeStub;

    before(function () {
        connectionStub = sinon.stub(connection, 'execute');
        camelizeStub = sinon.stub(camelize);
    });

    after(function () {
        connectionStub.restore();
        camelizeStub.restore();
    });

    it('deve retornar todos os produtos', async function () {
        const mockResult = [{ id: 1, name: 'Produto 1' }, { id: 2, name: 'Produto 2' }];
        connectionStub.returns([mockResult]);
        camelizeStub.returns(mockResult);

        const result = await findAll();

        expect(result).to.deep.equal(mockResult);
        expect(connectionStub.calledOnce).to.be.true;
        expect(camelizeStub.calledOnce).to.be.true;
    });

    it('deve retornar o produto com o id fornecido', async function () {
        const mockResult = { id: 1, name: 'Produto 1' };
        connectionStub.returns([[mockResult]]);
        camelizeStub.returns(mockResult);

        const result = await findById(1);

        expect(result).to.deep.equal(mockResult);
        expect(connectionStub.calledOnce).to.be.true;
        expect(camelizeStub.calledOnce).to.be.true;
    });
});

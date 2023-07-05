const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const models = require('../../../src/models/sales.model');

const { allSales } = require('../mock/sales.mock');

const { newSales } = require('../mock/newSales.mock');

describe('Testa o sales.model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o model getAll retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const sales = await models.getAll();

    expect(sales).to.be.an('array');
  });

  it('Testa se o model getById retorna a venda correta', async function () {
    sinon.stub(connection, 'execute').resolves([allSales[1]]);

    const sale = await models.getById(2);

    expect(sale).to.be.an('object');
    expect(sale).to.deep.equal(allSales[1]);
  });

  it('Testa se o model create retorna a venda correta', async function () {
    sinon.stub(connection, 'execute').resolves(newSales);

    const sale = await models.create(newSales);

    expect(sale).to.be.an('object');
  });
});
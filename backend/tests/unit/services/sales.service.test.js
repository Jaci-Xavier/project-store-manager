const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const models = require('../../../src/models/sales.model');

const services = require('../../../src/services/sales.services');

const { allSales } = require('../mock/sales.mock');

const { newSales } = require('../mock/newSales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o sales.services', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o model getAll retorna um objeto', async function () {
    sinon.stub(models, 'getAll').resolves([allSales]);

    const sales = await services.getAllSales();

    expect(sales).to.be.an('object');
  });

  it('Verifica se o retorno da função findSalesById no service é o produto correto', async function () {
    sinon.stub(models, 'getById').resolves(allSales[0]);
    const sales = await services.getSaleById(1);
    expect(sales.data).to.be.deep.equal(allSales[0]);
});

  it('testa se o o model getById retorna um errro quando não existir a venda com o id informado', async function () {
    sinon.stub(models, 'getById').resolves([]);

    const sale = await services.getSaleById(79);

    expect(sale).to.be.an('object');
    expect(sale).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
  });

  it('Testa se o model create retorna um objeto', async function () {
    sinon.stub(models, 'create').resolves(newSales);

    const sale = await services.createSale(newSales);

    expect(sale).to.be.an('object');
    expect(sale).to.deep.equal({ status: 'SUCESSFUL', data: newSales });
  });
});
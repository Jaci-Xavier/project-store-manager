const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const controllers = require('../../../src/controllers/sales.controllers');

const services = require('../../../src/services/sales.services');

const { allSales } = require('../mock/sales.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa o sales.controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o controller getAllSales retorna um objeto com o status "SUCESSFUL" e um array com todos os produtos', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'getAllSales').resolves({ data: allSales });

    await controllers.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Testa se o controller getSaleById retorna um objeto com o status "SUCESSFUL" e se o produto é o correto', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'getSaleById').resolves({ data: allSales });

    await controllers.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Testa se o controller getSaleById retorna um objeto com o status "NOT_FOUND" e uma mensagem de erro', async function () {
    const req = { params: { id: 372 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    sinon.stub(services, 'getSaleById').resolves({ data: { message: 'Sale not found' }, status: 'NOT_FOUND' });
  
    await controllers.getSaleById(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
  
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});
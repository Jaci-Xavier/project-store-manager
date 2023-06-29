const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const service = require('../../../src/services/products.services');

const controllers = require('../../../src/controllers/products.controllers');

const { allProducts } = require('../mock/product.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa o product.controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  test('Testa se o controller getAllProducts retorna um objeto com o status "SUCESSFUL" e um array com todos os produtos', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returns(),
      json: sinon.stub(),
    };

    sinon.stub(service, 'getAllProducts').resolves({ status: 'SUCESSFUL', data: allProducts });

    await controllers.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith({ status: 'SUCESSFUL', data: allProducts });
  });

  test('Testa se o controller getProductById retorna um objeto com o status "SUCESSFUL" e se o produto é o correto', async function () {
    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returns(),
      json: sinon.stub(),
    };

    sinon.stub(service, 'getProductById').resolves({ status: 'SUCESSFUL', data: allProducts[1] });

    await controllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith({ status: 'SUCESSFUL', data: allProducts[1] });
  });

  test('Testa se o controller getProductById retorna um objeto com o status "NOT_FOUND" e uma mensagem de erro', async function () {
    const req = { params: { id: 372 } };
    const res = {
      status: sinon.stub().returns(),
      json: sinon.stub(),
    };

    sinon.stub(service, 'getProductById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    await controllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);

    expect(res.json).to.have.been.calledWith({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });
});

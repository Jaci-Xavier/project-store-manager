const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const controllers = require('../../../src/controllers/products.controllers');

const services = require('../../../src/services/products.services');

const { allProducts } = require('../mock/product.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testa o product.controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o controller getAllProducts retorna um objeto com o status "SUCESSFUL" e um array com todos os produtos', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'getAllProducts').resolves({ data: allProducts });

    await controllers.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Testa se o controller getProductById retorna um objeto com o status "SUCESSFUL" e se o produto é o correto', async function () {
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'getProductById').resolves({ data: allProducts });

    await controllers.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);

    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Testa se o controller getProductById retorna um objeto com o status "NOT_FOUND" e uma mensagem de erro', async function () {
    const req = { params: { id: 372 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    sinon.stub(services, 'getProductById').resolves({ data: { message: 'Product not found' }, status: 'NOT_FOUND' });
  
    await controllers.getProductById(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
  
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testa se o controller createProduct retorna um objeto com o status "SUCESSFUL" e o produto criado', async function () {
    const req = { body: { name: 'Produto Teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'createProduct').resolves({ data: { id: 4, name: 'Produto Teste' }, status: 'SUCESSFUL' });

    await controllers.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);

    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Produto Teste' });
  });

  it('Testa se o controller createProduct retorna um objeto com o status "BAD_REQUEST" e uma mensagem de erro', async function () {
    const req = { body: { name: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'createProduct').resolves({ data: { message: '"name" is not allowed to be empty' }, status: 'BAD_REQUEST' });

    await controllers.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);

    expect(res.json).to.have.been.calledWith({ message: '"name" is not allowed to be empty' });
  });

  it('Testa se o controller createProduct retorna um objeto com o status "UNPROCESSABLE_ENTITY" e uma mensagem de erro', async function () {
    const req = { body: { name: 'Prod' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    sinon.stub(services, 'createProduct').resolves({ data: { message: 'Product already exists' }, status: 'UNPROCESSABLE_ENTITY' });

    await controllers.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);

    expect(res.json).to.have.been.calledWith({ message: 'Product already exists' });
  });
});

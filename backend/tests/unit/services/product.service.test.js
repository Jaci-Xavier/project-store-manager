const { expect } = require('chai');
const sinon = require('sinon');

const models = require('../../../src/models/products.model');

const services = require('../../../src/services/products.services');

const { allProducts } = require('../mock/product.mock');

describe('Testa o products.services', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o model getAll retorna um array', async function () {
    sinon.stub(models, 'getAll').resolves([allProducts]);

    const products = await services.getAllProducts();

    expect(products).to.be.an('object');
  });

  it('Testa se o model getById retorna o produto correto', async function () {
    sinon.stub(models, 'getById').resolves([[allProducts[1]]]);

    const product = await services.getProductById(2);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal({ status: 'SUCESSFUL', data: allProducts[1] });
  });

  it('testa se o o model getById retorna um errro quando não existir o produto com o id informado', async function () {
    sinon.stub(models, 'getById').resolves([]);

    const product = await services.getProductById(79);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });
});

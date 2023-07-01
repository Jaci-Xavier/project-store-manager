const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const models = require('../../../src/models/products.model');

const { allProducts } = require('../mock/product.mock');

describe('Testa o products.model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o model getAll retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const products = await models.getAll();

    expect(products).to.be.an('array');
  });

  it('Testa se o model getById retorna o produto correto', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);

    const product = await models.getById(2);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal(allProducts[1]);
  });
});

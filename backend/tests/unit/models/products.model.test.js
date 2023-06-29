const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { getAll, getById } = require('../../../src/models/products.model');

const { allProducts } = require('../mock/product.mock');

describe('Testa o products.model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  test('Testa se o model getAll retorna um array com todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const products = await getAll();

    expect(products).to.be.an('array');
    expect(products).to.deep.equal(allProducts);
    expect(products.length).to.be.equal(3);
  });

  test('Testa se o model getById retorna o produto correto', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[1]]]);

    const product = await getById(2);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal(allProducts[1]);
  });

  test('Testa se o model getById retorna um objeto com a mensagem de erro correta', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const product = await getById(372);

    expect(product).to.be.an('object');
    expect(product).to.have.property('message');
    expect(product.message).to.be.equal('Product not found');
  });
});

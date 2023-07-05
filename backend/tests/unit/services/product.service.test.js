const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const models = require('../../../src/models/products.model');

const services = require('../../../src/services/products.services');

const { allProducts } = require('../mock/product.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o products.services', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Testa se o model getAll retorna um objeto', async function () {
    sinon.stub(models, 'getAll').resolves([allProducts]);

    const products = await services.getAllProducts();

    expect(products).to.be.an('object');
  });

  // it('Testa se o model getById retorna o produto correto', async function () {
  //   sinon.stub(models, 'getById').resolves([[allProducts[1]]]);

  //   const product = await services.getProductById(2);

  //   expect(product).to.be.an('object');
  //   expect(product).to.deep.equal({ status: 'SUCESSFUL', data: allProducts[1] });
  // });

  it('testa se o o model getById retorna um errro quando não existir o produto com o id informado', async function () {
    sinon.stub(models, 'getById').resolves([]);

    const product = await services.getProductById(79);

    expect(product).to.be.an('object');
    expect(product).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });

  it('Testa se o model create retorna o produto correto', async function () {
    sinon.stub(models, 'create').resolves({
      id: 4,
      name: 'Produto',
    });

    const product = await services.createProduct('Produto');

    expect(product).to.be.an('object');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.data).to.have.property('id');
    expect(product.data).to.have.property('name');
    expect(product.data.name).to.be.equal('Produto');
  });

  it('Testa se o model create retorna um erro quando o nome do produto não é informado', async function () {
    const product = await services.createProduct();

    expect(product).to.be.an('object');
    expect(product).to.deep.equal({ status: 'BAD_REQUEST', data: { message: '"name" is required' } });
  });

  it('Testa se o model create retorna um erro quando o nome do produto tem menos de 5 caracteres', async function () {
    const product = await services.createProduct('Test');

    expect(product).to.be.an('object');
    expect(product).to.deep.equal({
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 5 characters long' },
    });
  });

  it('Testa o model update e verifica se o produto foi atualizado', async function () {
    sinon.stub(models, 'update').resolves({
      id: 1,
      name: 'Produto Teste',
    });

    const product = await services.updateProduct(1, 'Produto Teste');

    expect(product).to.be.an('object');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.data).to.have.property('id');
    expect(product.data).to.have.property('name');
    expect(product.data.name).to.be.equal('Produto Teste');
  });
});

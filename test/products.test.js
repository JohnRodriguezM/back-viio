const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { expect } = chai;

const { getAllProducts, getFilteredProducts } = require('../server/src/controllers/products/products.controller');

describe('Products Controller', () => {
  let req;
  let res;
  let get;

  beforeEach(() => {
    req = {
      query: {
        title: 'test',
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    get = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should get all products', async () => {
    const carts = [
      { products: [{ id: 1, title: 'Product 1' }, { id: 2, title: 'Product 2' }] },
      { products: [{ id: 3, title: 'Product 3' }] },
    ];
    get.resolves({ data: { carts } });

    await getAllProducts(req, res);

    expect(get.calledOnce).to.be.true;
    expect(get.firstCall.args[0]).to.equal('https://dummyjson.com/carts');
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Products found", data: carts.reduce((acc, cart) => [...acc, ...cart.products], []) })).to.be.true;
  });

  it('should get filtered products', async () => {
    const carts = [
      { products: [{ id: 1, title: 'Test Product' }, { id: 2, title: 'Another Product' }] },
      { products: [{ id: 3, title: 'Product Test' }] },
    ];
    get.resolves({ data: { carts } });

    await getFilteredProducts(req, res);

    expect(get.calledOnce).to.be.true;
    expect(get.firstCall.args[0]).to.equal('https://dummyjson.com/carts');
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: "Products found", data: carts.reduce((acc, cart) => [...acc, ...cart.products], []).filter(product => product.title.toLowerCase().includes(req.query.title.toLowerCase())) })).to.be.true;
  });
});
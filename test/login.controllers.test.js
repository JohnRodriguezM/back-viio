const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const { signUpWithJwtAuth } = require('../server/src/controllers/login/login.controllers');

describe('signUpWithJwtAuth', () => {
  let req;
  let res;
  let next;
  let dbConnection;
  let hash;
  let sign;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
    dbConnection = {
      query: sinon.stub(),
    };
    hash = sinon.stub(bcrypt, 'hash');
    sign = sinon.stub(jwt, 'sign');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user and return a token', async () => {
    const existingUsers = [];
    const hashedPassword = 'hashedPassword';
    const insertId = 1;
    const token = 'token';

    dbConnection.query.onFirstCall().resolves([existingUsers]);
    hash.resolves(hashedPassword);
    dbConnection.query.onSecondCall().resolves([{ insertId }]);
    sign.returns(token);

    await signUpWithJwtAuth(req, res, next);

    expect(dbConnection.query.called).to.be.true;
    expect(res.status.calledWith(400)).to.be.false;
    expect(res.json.calledWithMatch({ token })).to.be.true;
  });

  // ... rest of your tests
});
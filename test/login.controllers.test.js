const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const { expect } = chai;

const { signUpWithJwtAuth, loginWithJwtAuth } = require('../server/src/controllers/login/login.controllers');

describe('signUpWithJwtAuth', () => {
  let req;
  let res;
  let next;
  let dbConnection;
  let hash;
  let sign;
  let connect;

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
    connect = sinon.stub(mysql, 'createConnection');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user and return a token', async () => {
    connect.resolves(dbConnection);
    dbConnection.query.onFirstCall().resolves([[]]); // No existing users
    dbConnection.query.onSecondCall().resolves([{ insertId: 1 }]); // Inserted user ID
    hash.resolves('hashedPassword');
    sign.returns('token');

    await signUpWithJwtAuth(req, res, next);

    expect(dbConnection.query.calledTwice).to.be.true;
    expect(dbConnection.query.firstCall.args[0]).to.equal('SELECT * FROM USERS WHERE email = ?');
    expect(dbConnection.query.firstCall.args[1]).to.deep.equal([req.body.email]);
    expect(dbConnection.query.secondCall.args[0]).to.equal('INSERT INTO USERS (email, password) VALUES (?, ?)');
    expect(dbConnection.query.secondCall.args[1]).to.deep.equal([req.body.email, 'hashedPassword']);
    expect(res.status.calledWith(400)).to.be.false;
    expect(res.json.calledWithMatch({ token: 'token', message: "User created successfully." })).to.be.true;
  });
});

describe('loginWithJwtAuth', () => {
  let req;
  let res;
  let next;
  let dbConnection;
  let compare;
  let sign;
  let connect;

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
    compare = sinon.stub(bcrypt, 'compare');
    sign = sinon.stub(jwt, 'sign');
    connect = sinon.stub(mysql, 'createConnection');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should log in a user and return a token', async () => {
    connect.resolves(dbConnection);
    dbConnection.query.resolves([[{ id: 1, password: 'hashedPassword' }]]);
    compare.resolves(true);
    sign.returns('token');

    await loginWithJwtAuth(req, res, next);

    expect(dbConnection.query.calledOnce).to.be.true;
    expect(dbConnection.query.firstCall.args[0]).to.equal('SELECT id, password FROM USERS WHERE email = ?');
    expect(dbConnection.query.firstCall.args[1]).to.deep.equal([req.body.email]);
    expect(compare.calledOnce).to.be.true;
    expect(compare.firstCall.args).to.deep.equal([req.body.password, 'hashedPassword']);
    expect(res.status.calledWith(401)).to.be.false;
    expect(res.json.calledWithMatch({ token: 'token', message: "Login successful." })).to.be.true;
  });
});
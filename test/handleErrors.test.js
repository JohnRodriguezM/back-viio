const chai = require('chai');
const sinon = require('sinon');
const handleError = require('../server/src/controllers/handleErrors/handleErrors');
const { expect } = chai;

describe('handleError', () => {
  // Test case 1: Verify the response status code and JSON structure
  it('should return the error response with status code 500 and correct JSON structure', () => {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const err = new Error('Test error');

    handleError(err, req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({
      id_error: sinon.match.string,
      message: sinon.match.string,
      detail: sinon.match.string,
      success: false,
    })).to.be.true;
  });

  // Test case 2: Verify the error message in the response
  it('should return the error message in the response', () => {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const err = new Error('Test error');

    handleError(err, req, res);

    expect(res.json.getCall(0).args[0].message).to.equal(
      "Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde o póngase en contacto con el soporte técnico si el problema persiste."
    );
  });
});
const { assert } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

describe('sendPaymentRequestToApi', () => {
	let calulateNumberStub;
	let consoleLogSpy;

	beforeEach(() => {
		calculateNumberStub = sinon.stub(Utils, 'calculateNumber');
		consoleLogSpy = sinon.spy(console, 'log');
	});

	afterEach(() => {
		calculateNumberStub.restore();
		consoleLogSpy.restore();
	});

	it('should call Utils.calculateNumber with SUM type, 100 as a, and 20 as b', () => {
		sendPaymentRequestToApi(100, 20);
		sinon.assert.calledWith(calculateNumberStub, 'SUM', 100, 20);
	});

	it('should log the correct message "The total is: 10"', () => {
		calculateNumberStub.returns(10);
		sendPaymentRequestToApi(100, 20);
		sinon.assert.calledWith(consoleLogSpy, 'The total is: 10');
	});
});

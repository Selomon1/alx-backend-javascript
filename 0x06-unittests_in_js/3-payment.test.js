const { expect } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
	let calulateNumberSpy;

	beforeEach(() => {
		calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');
	});

	afterEach(() => {
		calculateNumberSpy.restore();
	});

	it('should call Utils.calculateNumber with SUM and correct arguments', () => {
		const totalAmount = 100;
		const totalShipping = 20;
		sendPaymentRequestToApi(totalAmount, totalShipping);

		expect(calculateNumberSpy.calledOnce).to.be.true;
		expect(calculateNumberSpy.calledWithExactly('SUM', totalAmount, totalShipping)).to.be.true;
	});

	it('should log the correct total sum', () => {
		const totalAmount = 100;
		const totalShipping = 20;
		const expectedSum = totalAmount + totalShipping;

		const consoleSpy = sinon.spy(console, 'log');
		sendPaymentRequestToApi(totalAmount, totalShipping);

		expect(consoleSpy.calledOnce).to.be.true;
		expect(consoleSpy.calledWith(`The total is: ${expectedSum}`)).to.be.true;

		consoleSpy.restore();
	});
});

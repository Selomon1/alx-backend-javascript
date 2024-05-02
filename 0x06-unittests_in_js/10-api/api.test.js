const { expect } = require('chai');
const request = require('request');

describe('Index page', () => {
	it('Correct status code?', (done) => {
		request('http://localhost:7865', (error, response, body) => {
			expect(response.statusCode).to.equal(200);
			done();
		});
	});

	it('Correct result?', (done) => {
		request('http://localhost:7865', (error, response, body) => {
			expect(body).to.equal('Welcome to the payment system');
			done();
		});
	});
});

describe('Cart page', () => {
	it('Correct status code when :id is a number?', (done) => {
		request('http://localhost:7865/cart/12', (error, response, body) => {
			expect(response.statusCode).to.equal(200);
			expect(body).to.equal('Payment methods for cart 12');
			done();
		});
	});

	it('Correct status code when :id is NOT a number (=> 404)?', (done) => {
		request('http://localhost:7865/cart/hello', (error, response, body) => {
			expect(response.statusCode).to.equal(404);
			done();
		});
	});
});

describe('Login endpoint', () => {
	it('Returns correct message after login', (done) => {
		const options = {
			url: 'http://localhost:7865/login',
			method: 'POST',
			json: true,
			body: { userName: 'Betty' }
		};
		request(options, (error, response, body) => {
			expect(response.statusCode).to.equal(200);
			expect(body).to.equal('Welcome Betty');
			done();
		});
	});
});

describe('Available Payments endpoint', () => {
	it('Returns correct payment methods object', (done) => {
		request('http://localhost:7865/available_payments', (error, response, body) => {
			expect(response.statusCode).to.equal(200);
			const expectedPaymentMethods = {
				payment_methods: {
					credit_cards: true,
					paypal: false
				}
			};
			expect(JSON.parse(body)).to.deep.equal(expectedPaymentMethods);
			done();
		});
	});
});

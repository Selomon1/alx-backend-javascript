const assert = require('assert');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
	it('should resolve with data when success is true', (done) => {
		getPaymentTokenFromAPI(true)
			.then((response) => {
				assert.deepStrictEqual(response, { data: 'Successful response from the API' });
				done();
			})
			.catch((error) => {
				done(error);
			});
	});
	
	it('should resolve with undefined when success is false', (done) => {
		getPaymentTokenFromAPI(false)
			.then((response) => {
				assert.strictEqual(response, undefined);
				done();
			})
			.catch((error) => {
				done(error);
			});
	});
});

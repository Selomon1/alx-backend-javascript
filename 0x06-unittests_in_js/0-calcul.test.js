const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
	it('should return the sum of integer numbers', () => {
		assert.strictEqual(calculateNumber(1, 3), 4);
		assert.strictEqual(calculateNumber(1, -3), -2);
		assert.strictEqual(calculateNumber(-1, 3), 2);
	});

	it('should return the sum of float numbers', () => {
		assert.strictEqual(calculateNumber(1.7, 1.1), 3);
		assert.strictEqual(calculateNumber(1.5, 1.1), 3);
		assert.strictEqual(calculateNumber(1, 1.1), 2);
		assert.strictEqual(calculateNumber(1.0, 1.1), 2);
		assert.strictEqual(calculateNumber(0.4, 0), 0);
		assert.strictEqual(calculateNumber(1.3, -4.2), -3);
		assert.strictEqual(calculateNumber(1.5, -4.2), -2);
		assert.strictEqual(calculateNumber(-1.7, -4.2), -6);
	});

	it('should return one number rounded if provided one number', () => {
		assert.strictEqual(calculateNumber(4), 4);
		assert.strictEqual(calculateNumber(-4), -4);
		assert.strictEqual(calculateNumber(4.5), 5);
		assert.strictEqual(calculateNumber(-4.7), -5);
	});
});

const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
	it('should add two rounded numbers for type SUM', () => {
		assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
	});

	it('should substract two rounded numbers for type SUBTRACT', () => {
		assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
	});

	it('should divide two rounded numbers for type DIVIDE', () => {
		assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
	});

	it('should return Error for divisions by zero with type DIVIDE', () => {
		assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
	});

	it('should throw error for invalid type', () => {
		assert.throws(() => {
			calculateNumber('MULTIPLY', 2, 3);
		}, /Invalid type/);
	});
});

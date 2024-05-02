const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber function', () => {
	it('should correctly calculate the sum of two numbers', () => {
		expect(calculateNumber('SUM', 2, 3)).to.equal(5);
		expect(calculateNumber('SUM', -1, 1)).to.equal(0);
	});

	it('should correctly calculate the subtract of two numbers', () => {
		expect(calculateNumber('SUBTRACT', 5, 3)).to.equal(2);
		expect(calculateNumber('SUBTRACT', 10, -2)).to.equal(12);
	});

	it('should correctly calculate the division of two numbers', () => {
		expect(calculateNumber('DIVIDE', 10, 2)).to.equal(5);
		expect(calculateNumber('DIVIDE', 9, 3)).to.equal(3);
	});

	it('should throw "Error" when dividing by zero', () => {
		expect(calculateNumber('DIVIDE', 10, 0)).to.equal('Error');
	});

	it('should throw an error for invalid operation types', () => {
		expect(() => calculateNumber('MULTIPLY', 2, 3)).to.throw('Invalid type: MULTIPLY');
	});
});

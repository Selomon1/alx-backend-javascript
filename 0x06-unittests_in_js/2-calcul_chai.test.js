const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
	it('should add two rounded numbers for type SUM', () => {
		expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
	});

	it('should substract two rounded numbers for type SUBTRACT', () => {
		expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
	});

	it('should divide two rounded numbers for type DIVIDE', () => {
		expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
	});

	it('should return Error for divisions by zero with type DIVIDE', () => {
		expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
	});

	it('should throw error for invalid type', () => {
		expect(() => {
			calculateNumber('MULTIPLY', 2, 3);
		}).to.throw(Error, /Invalid type/);
	});
});

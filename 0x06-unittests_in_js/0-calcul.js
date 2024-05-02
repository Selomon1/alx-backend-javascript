function calculateNumber(a, b) {
	if (b === undefined) {
		return Math.round(a);
	} else {
		return Math.round(a) + Math.round(b);
	}
}

module.exports = calculateNumber;

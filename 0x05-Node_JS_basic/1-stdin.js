const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log('Welcome to Holberton School, what is your name?');

rl.on('line', (input) => {
	const name = input.trim();
	if (name) {
		console.log(`Your name is: ${name}`);
		rl.close();
		console.log('This important software is now closing');
	}
});

if(!process.stdin.isTTY) {
	let input = '';
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', (chunk) => {
		input += chunk;
	});

	process.stdin.on('end', () => {
		const name = input.trim();
		if (name) {
			console.log(`Your name is: ${name}`);
			console.log('This important software is now closing');
		}
	});
}

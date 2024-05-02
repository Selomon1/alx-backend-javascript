const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to Holberton School, what is your name?');

rl.on('line', (input) => {
  const name = input;
  if (name) {
    console.log(`Your name is: ${name}`);
    rl.close();
  }
});

if (!process.stdin.isTTY) {
  rl.question('', (input) => {
    const name = input;
    if (name) {
      console.log(`Your name is: ${name}`);
    }
    rl.close();
    console.log('This important software is now closing');
  });
}

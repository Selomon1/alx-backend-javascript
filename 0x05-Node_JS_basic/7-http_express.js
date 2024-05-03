const { readFile } = require('fs');
const express = require('express');

const app = express();
const PORT = 1245;

function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error loading database:', err);
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n');

        const studentsByField = {};

        lines.forEach((line, index) => {
          if (index === 0) {
            return;
          }

          const fields = line.split(',');
          const firstname = fields[0].trim();
          const field = fields[3].trim();

          if (firstname && field) {
            if (!studentsByField[field]) {
              studentsByField[field] = [];
            }
            studentsByField[field].push(firstname);
          }
        });

        let output = `Number of students: ${lines.length - 1}\n`;

        for (const [field, names] of Object.entries(studentsByField)) {
          output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        }

        resolve(output);
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((output) => {
      const data = output.slice(0, -1);
      res.send(`This is the list of our students\n${data}`);
    })
    .catch(() => {
      res.status(404).send('This is the list of our students\nCannot load the database');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;

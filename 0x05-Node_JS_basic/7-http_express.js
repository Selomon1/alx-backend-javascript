const { readFile } = require('fs').promises;
const express = require('express');

const app = express();
const PORT = 1245;

function countStudents(fileName) {
  return readFile(fileName, 'utf-8')
    .then((data) => {
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

      let output = `This is the list of our students\n`;
      output += `Number of students: ${lines.length - 1}\n`;

      for (const [field, names] of Object.entries(studentsByField)) {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      return output;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
  });
}


app.get('/', (req, res) => {
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');
  countStudents(process.argv[2])
    .then((output) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error('Error loading database:', error.message);
      res.status(404).send('Cannot load the database');
    });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;

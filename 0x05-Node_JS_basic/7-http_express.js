const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const PORT = 1245;

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const fileName = process.argv[2];
  if (!fileName) {
    res.status(400).send('Error: Database file not provided');
    return;
  }

  countStudents(fileName)
    .then((studentsByField) => {
      const totalStudents = Object.values(studentsByField)
        .reduce((sum, names) => sum + names.length, 0);
      let response = 'This is the list of our students\n';
      response += `Number of students: ${totalStudents}\n`;

      const fields = Object.entries(studentsByField);
      fields.forEach(([field, names], index) => {
        const count = names.length;
        const studentList = names.join(', ');
        response += `Number of students in ${field}: ${count}. List: ${studentList}`;
        if (index !== fields.length - 1) {
          response += '\n';
        }
      });

      res.type('text').send(response);
    })
    .catch((error) => {
      res.status(500).send(`Error: ${error.message}`);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;

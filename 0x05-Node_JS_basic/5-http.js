const { readFile } = require('fs');
const http = require('http');


function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf-8')
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

        const totalStudents = Object.values(studentsByField)
          .reduce((sum, names) => sum + names.length, 0);
        let output += `Number of students: ${totalStudents}`;

        for (const [field, names] of Object.entries(studentsByField)) {
          const count = names.length;
          output += `Number of students in ${field}: ${count}. List: ${names.join(', ')}`;
        }

        resolve(output);
      })
      .catch((error) => {
        reject(new Error('Canot load the database'));
      });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }
  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2].then((output) => {
      const data = output.slice(0, -1);
      res.end(data)
    })
    .catch(() => {
      res.statusCode = 401;
      res.end('Cannot load the database');
    });
  }
});

const PORT = 1245;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;

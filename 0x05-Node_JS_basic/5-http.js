const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1245;

function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(fileName, 'utf-8')
      .then((data) => {
        const lines = data.trim().split('\n');

        const studentsByField = {};

        lines.forEach((line, index) => {
          if (index === 0) {
            return; // Skip the header line
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

        let output = `Number of students: ${totalStudents}\n`;
        for (const [field, names] of Object.entries(studentsByField)) {
          const count = names.length;
          output += `Number of students in ${field}: ${count}. List: ${names.join(', ')}\n`;
        }

        resolve(output);
      })
      .catch((error) => {
        console.error(`Error loading database: ${error.message}`);
        reject(new Error('Cannot load the database'));
      });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    const fileName = process.argv[2];

    if (!fileName) {
      res.statusCode = 400;
      res.end('Error: Database file not provided\n');
      return;
    }

    countStudents(fileName)
      .then((output) => {
        res.end(output);
      })
      .catch((error) => {
        console.error(`Error processing student data: ${error.message}`);
        res.statusCode = 500;
        res.end('Error: Cannot load the database\n');
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found\n');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

module.exports = app;

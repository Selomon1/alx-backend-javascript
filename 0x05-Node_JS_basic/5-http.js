const { readFile } = require('fs');
const http = require('http');


function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(process.argv[2]
      .then((output) => {
        res.end(output);
      })
      .catch(() => {
        res.statusCode = 401;
        res.end('Cannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 1245;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

module.exports = app;

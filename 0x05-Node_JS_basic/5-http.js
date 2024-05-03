const http = require('http');
const { readFile } = require('fs');

const hostname = '127.0.0.1';
const port = 1245;

function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const studentsByField = {};
        const lines = data.toString().split('\n');

        lines.forEach((line) => {
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

        const totalStudents = lines.length - 1; // Total number of students
        const output = `Number of students: ${totalStudents}\n`;

        Object.entries(studentsByField).forEach(([field, names]) => {
          const count = names.length;
          const studentList = names.join(', ');
          output += `Number of students in ${field}: ${count}. List: ${studentList}\n`;
        });

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
    const fileName = process.argv[2];

    if (!fileName) {
      res.statusCode = 400;
      res.end('Error: Database file not provided\n');
      return;
    }

    // Perform database file existence check
    if (!fs.existsSync(fileName)) {
      res.statusCode = 404;
      res.end('Error: Database file not found\n');
      return;
    }

    // Fetch and process student data from the database file
    countStudents(fileName)
      .then((output) => {
        res.write('This is the list of our students\n');
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

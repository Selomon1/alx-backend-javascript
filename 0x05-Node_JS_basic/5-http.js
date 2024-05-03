const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  const { url } = req;
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    const fileName = process.argv[2];
    if (!fileName) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Database file not provided\n');
    } else {
      countStudents(fileName)
        .then((studentsByField) => {
          const totalStudents = Object.values(studentsByField)
            .reduce((sum, names) => sum + names.length, 0);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('This is the list of our students\n');
          res.write(`Number of students: ${totalStudents}\n`);

          for (const [field, names] of Object.entries(studentsByField)) {
            const count = names.length;
            const studentList = names.join(', ');

	    const fieldOutput = `Number of students in ${field}: ${count}. List: ${studentList}`;
	    res.write(fieldOutput);

	    if (field !== Object.keys(studentsByField)[Object.keys(studentsByField).length - 1]) {
	      res.write('\n');
            }
          }
          res.end();
        })
        .catch((error) => {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Error: ${error.message}\n`);
        });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
  }
});

const hostname = '127.0.0.1';
const PORT = 1245;
app.listen(PORT, hostname, () => {
  console.log(`Server is running at http://${hostname}:${PORT}/`);
});

module.exports = app;

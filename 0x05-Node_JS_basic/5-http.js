const http = require('http');
const { countStudents } = require('./3-read_file_async'); // Import the countStudents function

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');
    const fileName = process.argv[2]; // Get the database file name from command line args

    if (!fileName) {
      res.statusCode = 400;
      res.end('Error: Database file not provided\n');
      return;
    }

    // Call the countStudents function with the database file name
    countStudents(fileName)
      .then((studentsByField) => {
        // Build the response based on the studentsByField object
        const totalStudents = Object.values(studentsByField)
          .reduce((sum, names) => sum + names.length, 0);

        res.write(`Number of students: ${totalStudents}\n`);

        for (const [field, names] of Object.entries(studentsByField)) {
          const count = names.length;
          res.write(`Number of students in ${field}: ${count}. List: ${names.join(', ')}\n`);
        }

        res.end();
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

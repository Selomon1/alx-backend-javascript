const fs = require('fs');

function countStudents(fileName) {
  try {
    const data = fs.readFileSync(fileName, 'utf-8');

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
    console.log(`Number of students: ${totalStudents}`);

    for (const [field, names] of Object.entries(studentsByField)) {
      const count = names.length;
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    console.error(`Error loading database: ${error.message}`);
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

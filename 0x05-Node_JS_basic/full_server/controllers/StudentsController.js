import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentsByField = await readDatabase(process.argv[2].toString());
      const output = [];
      output.push('This is the list of our students');
      const keys = Object.keys(studentsByField).sort();

      keys.forEach((key) => {
        output.push(`Number of students in ${key}: ${studentsByField[key].length}. List: ${studentsByField[key].join(', ')}`);
      });

      res.status(200).send(output.join('\n'));
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    try {
      const studentsByField = await readDatabase(process.argv[2].toString());
      if (!(major in studentsByField)) {
        res.status(500).send('Major parameter must be CS or SWE');
      } else {
        res.status(200).send(`List: ${studentsByField[major].join(', ')}`);
      }
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;

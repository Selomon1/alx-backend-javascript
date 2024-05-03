/* eslint-disable import/prefer-default-export */
import fs from 'fs';

export function readDatabase(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.split('\n');
        const studentsByField = {};

        lines.forEach((line) => {
          const [firstName, field] = line.split(',');
          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }
          studentsByField[field].push(firstName);
        });

        resolve(studentsByField);
      }
    });
  });
}

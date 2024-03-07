export class HolbertonClass {
  constructor(year, location) {
    this._year = year;
    this._location = location;
  }

  get year() {
    return this._year;
  }

  get location() {
    return this._location;
  }
}

export class StudentHolberton {
  constructor(firstName, lastName, holbertonClass) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._holbertonClass = holbertonClass;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  get holbertonClass() {
    return this._holbertonClass;
  }

  get fullStudentDescription() {
    return `${this._firstName} ${this._lastName} - ${this.holbertonClass.year} - ${this.holbertonClass.location}`;
  }
}

const class2019 = HolbertonClass(2019, 'San Francisco');
const class2020 = HolbertonClass(2020, 'SanFrancisco');

const student1 = StudentHolberton('Guillaume', 'Salva', class2020);
const student2 = StudentHolberton('John', 'Doe', class2020);
const student3 = StudentHolberton('Albert', 'Clinton', class2019);
const student4 = StudentHolberton('Donald', 'Bush', class2019);
const student5 = StudentHolberton('Jason', 'Sandler', class2019);

export const listOfStudents = [student1, student2, student3, student4, student5];
export default listOfStudents;

// Teacher interface
interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}

// Extend the Teacher class
interface Directors extends Teacher {
  numberOfReports: number;
}

// Printing teachers
interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName, lastName) => {
  return `${firstName.charAt(0)}. ${lastName}`;
};

// Writing a class
interface StudentClassInterface {
  new (firstName: string, lastName: string): StudentClassDo;
}

interface StudentClassDo {
  workOnHomework(): string;
  displayName(): string;
}

class StudentClass implements StudentClassDo {
  constructor(public firstName: string, public lastName: string) {}

  workOnHomework(): string {
    return "Currently working";
  }

  displayName(): string {
    return this.firstName;
  }
}

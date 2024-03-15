namespace Subjects {
  export class Cpp extends Subject {
    public getRequirements(): string {
      return "Here is the list of requirements for C++";
    }

    public getAvailableTeacher(): string {
      if (this.teacher.experienceTeacherC !== undefined && this.teacher.experienceTeachingC > 0) {
        return `Available Teachers: ${this.teacher.firstname}`;
      } else {
        return "No available teacher";
      }
    }
  }
}

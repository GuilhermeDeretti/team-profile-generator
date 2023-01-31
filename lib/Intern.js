const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    // if (typeof id !== 'number' || value <= 0) {
    //     throw new Error("ID 'value' must be a positive number");
    // }     
    super(name, id, email);
    this.school = school;
  }
  getRole() {
    return "Intern";
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// Array to store team's input info.
const newTeam = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const findForm = (employeeType) => {
  let questions = [
    {
      type: "input",
      message: "Please enter the name",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter the ID",
      name: "id",
    },
    {
      type: "input",
      message: "Please enter the email",
      name: "email",
    }
  ];
  switch (employeeType) {
    case "Manager":
      questions.push({
        type: "input",
        message: "Please enter your team manager office number",
        name: "extraInfo",
      });
      break;
    case "Engineer":
      questions.push({
        type: "input",
        message: "Please enter the the team Engineer GitHub username",
        name: "extraInfo",
      });
      break;
    case "Intern":
      questions.push({
        type: "input",
        message: "Please enter the the Intern school name",
        name: "extraInfo",
      });
      break;
  };
  return questions;
}

const generateEmployee = (employeeType) => {
  inquirer
    .prompt(findForm(employeeType))
    .then((employee) => {
      let newEmployee;
      switch (employeeType) {
        case "Manager":
          newEmployee = new Manager(
            employee.name,
            employee.id,
            employee.email,
            employee.extraInfo
          );
          break;
        case "Engineer":
          newEmployee = new Engineer(
            employee.name,
            employee.id,
            employee.email,
            employee.extraInfo
          );
          break;
        case "Intern":
          newEmployee = new Intern(
            employee.name,
            employee.id,
            employee.email,
            employee.extraInfo
          );
          break;
      };      
      newTeam.push(newEmployee);
      buildTeam();
    });
};

const buildTeam = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message:
          "Please select the employee you would like to add to your team?",
        name: "employeeChoice",
        choices: ["Engineer", "Intern", "Finish the team"],
      },
    ])
    .then((response) => {
      if (response.employeeChoice === "Finish the team") {
        console.log("\n Generating your new team...");        
        fs.writeFileSync(outputPath, render(newTeam), { encoding: "utf-8" });        
        console.log("\n Great! Your team has been created!");
      } else generateEmployee(response.employeeChoice);
    });
}

const init = () => {
  console.log("\n To create your team, let's start from your team Manager:");
  generateEmployee("Manager");
};

init();
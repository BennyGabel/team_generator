// const { default: inquirer } = require('inquirer');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern   = require('./lib/Intern')
const Manager  = require('./lib/Manager')

console.log("Program started")

const askManager = () => {
    return inquirer.prompt(
                           [{
                                type: 'input',
                                name: 'name',
                                message: 'Enter the manager\'s name:',
                                validate: nameInput => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter manager\'s name!!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'EmployeeId',
                                message: 'Enter the manager\'s id:'
                            },
                            {
                                type: 'input',
                                name: 'emailAddress',
                                // Please note email validation
                                message: 'Enter the manager\'s email:', 
                                validate: function(email)
                                {
                                    // Regex mail check (return true if valid mail)
                                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                                }

                            },
                            {
                                type: 'input',
                                name: 'officeNumber',
                                message: 'Enter the manager\'s office number:'
                            }
                           ]
                          )
                         }


const askEmployees = otherEmployees => {
    return inquirer.prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Enter the persons role is:',
                                choices: ['Engineer', "Intern"]
                            },
                            {
                                type: 'input',
                                name: 'name',
                                message: 'Enter  name:',
                                validate: nameInput => {
                                    if (nameInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter manager\'s name!!');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                name: 'Employee Id:',
                                message: 'Enter the manager\'s id:'
                            },
                            {
                                type: 'input',
                                name: 'email_address:',
                                // Please note email validation
                                message: 'Enter the manager\'s email:', 
                                validate: function(email)
                                {
                                    // Regex mail check (return true if valid mail)
                                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                                }

                            },                            

                           ]
                          )
                         }
                         

console.log("Before askManager")

askManager().then(answers => {
    const newManager = new Manager(answers.name, answers.EmployeeId, answers.emailAddress)
    newManager.officeNumber = answers.officeNumber

    console.log(newManager)
})

.then(askEmployees())

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
                                name: 'id',
                                message: 'Enter the manager\'s id:'
                            },
                            {
                                type: 'input',
                                name: 'email',
                                message: 'Enter the manager\'s email:'
                            }
                           ]
                          )
                         }

/*
const askEmployees = otherEmployees => {
    return inquirer.prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Enter the persons role is:',
                                // choices:

                            }
                           ]
                          )
                         }
*/                         

console.log("Before askManager")

askManager()

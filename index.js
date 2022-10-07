const inquire = require('inquirer');

const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern   = require('./lib/Intern')
const Manager  = require('./lib/Manager')

const questions = [{
                        type: 'input',
                        name: 'name',
                        message: 'Enter the manager\'s name:'
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
                    },


                    {
                        type: 'list',
                        name: 'role',
                        message: 'Enter the persons role is:',
                        choices:

                    }



]
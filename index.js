// const { default: inquirer } = require('inquirer');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern   = require('./lib/Intern')
const Manager  = require('./lib/Manager')

let team = []

var nId = 0

// Inquirer for a Manager
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

// Inquirer menu/option/desicion Engineer ot Intern
const employeeMenu = () => {
     inquirer.prompt([
         {
             type: 'list',
             name: 'role',
             message: 'Enter the persons role is:',
             choices: ['Engineer', "Intern", "Quit"]
         }]).then(ansEmployee=>{
            console.log(ansEmployee)
            switch (ansEmployee.role) {
                case "Engineer":
                    addEngineer()
                    // console.log(team)
                    break

                case "Intern":
                    addIntern()
                    // console.log(team)
                    break

                case "Quit":
                    console.log("Ending questions")

                    console.log("-------------------------")
                    console.log(team)
                    console.log(team.length)
                    console.log(team[0])
                    console.log(team[0].name)
                    console.log(team[0].id)
                    console.log(team[0].getRole())

                    console.log(team[1])
                    console.log(team[1].getRole())

                    console.log(team[2])
                    console.log(team[2].getRole())


                    // //console.log("Manager" ,  Manager[0]['name'] )
                    // console.log("Manager" ,  Manager.length )
                    // console.log("Engineer",  Engineer.length)
                    // console.log("Intern"  ,  Intern[0]['school'])
                    
                    break
            }


         })
    }

        
// Inquirer for a Engineer
 const addEngineer = () => {
    inquirer.prompt(
        [{
            type: 'input',
            name: 'name',
            message: 'Enter  name:',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter engineer\'s name!!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'EmployeeId',
            message: 'Enter the engineer\'s id:'
        },
        {
            type: 'input',
            name: 'emailAddress',
            // Please note email validation
            message: 'Enter the engineer\'s email:', 
            validate: function(email)
            {
                // Regex mail check (return true if valid mail)
                return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
            }

        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter the engineer\'s github username:',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please Enter the engineer\'s github username!!:');
                    return false;
                }
            }
        }]                            
    ).then(ansEngineer=>{
        console.log("ansEngineer", ansEngineer)
        const newEngineer = new Engineer(ansEngineer.name, ansEngineer.EmployeeId, ansEngineer.emailAddress)
        newEngineer.github = ansEngineer.github
        team.push(newEngineer)
        console.log("new Engineer", newEngineer)
    }).then(()=>employeeMenu())
 }

 // Inquirer for a Intern
 const addIntern = () => {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'Enter  name:',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter intern\'s name!!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'EmployeeId',
                message: 'Enter the intern\'s id:'
            },
            {
                type: 'input',
                name: 'emailAddress',
                // Please note email validation
                message: 'Enter the intern\'s email:', 
                validate: function(email)
                {
                    // Regex mail check (return true if valid mail)
                    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                }
    
            },
            {
                type: 'input',
                name: 'school',
                message: 'Enter the intern\'s school:',
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log('Please Enter the intern\'s school:');
                        return false;
                    }
                }
    
            }            
        ]
    ).then(ansIntern=>{
        console.log("ansIntern", ansIntern)
        const newIntern = new Intern(ansIntern.name, ansIntern.EmployeeId, ansIntern.emailAddress)
        ansIntern.school = ansIntern.school
        team.push(newIntern)
        console.log("new Intern", ansIntern)}).then(()=>employeeMenu())
}



console.log("Before askManager")


askManager().then(answers => {
    const newManager = new Manager(answers.name, answers.EmployeeId, answers.emailAddress)
    newManager.officeNumber = answers.officeNumber

    team.push(newManager)

    console.log(newManager)
})
.then(()=>employeeMenu())

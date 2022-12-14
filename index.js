const fs = require('fs');

const inquirer = require('inquirer');

const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern   = require('./lib/Intern')
const Manager  = require('./lib/Manager')

let team = []

var nId = 0




// Inquirer for a Manager.
// Will ONLY ASK FOR 1 MANAGER
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
// End function     askManager    ---------------------------------------------




// Inquirer menu/option/desicion Engineer ot Intern
// Will loop through; allow user to select/add as many Engineers and or Interns unti user select Quit
const employeeMenu = () => {
     inquirer.prompt([
         {
             type: 'list',
             name: 'role',
             message: 'Enter the persons role is:',
             choices: ['Engineer', "Intern", "Quit"]
         }]).then(ansEmployee=>{
            switch (ansEmployee.role) {
                case "Engineer":
                    addEngineer()
                    break

                case "Intern":
                    addIntern()
                    break

                case "Quit":
/*
                    console.log("Ending questions")

                    console.log("-------------------------")

//                  Evaluating values

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
*/                    

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'sort',
                            message: 'Sorted by:',
                            choices: ['Entry order', "Grouped by Role"]}]).then(displayBy=>{
                                switch (displayBy.sort) {
                                    case "Entry order":
                                        // Generate HTML by Entry order
                                        genHtml()
                                        break
                                    case "Grouped by Role":
                                        // Generate HTML sorted by role
                                        genSortHtml()
                                        break
                            }}
                    )



            }


         })
    }
// End function     employeeMenu    ---------------------------------------------



        
// Inquirer for a addEngineer
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
        const newEngineer = new Engineer(ansEngineer.name, ansEngineer.EmployeeId, ansEngineer.emailAddress)
        newEngineer.github = ansEngineer.github
        team.push(newEngineer)
    }).then(()=>employeeMenu())
 }
// End function     addEngineer    ---------------------------------------------




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
        const newIntern = new Intern(ansIntern.name, ansIntern.EmployeeId, ansIntern.emailAddress)
        newIntern.school = ansIntern.school
        team.push(newIntern)}).then(()=>employeeMenu())
}
// End function     addIntern    ---------------------------------------------




// Generate HTML by Order which was entered
const genHtml = () => {
    blockHead = 
    `<!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Team Generator</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="../dist/style.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
            </head>
        <body>
        
        `

    blockTitle =
            `<div class="col-xs-1 company-title">
                <h1>Company Title</h1>
            </div>
            
            <br/>
            
            <div class="container">

                <div class="row">
                `

    let blockCard = ""      // blockCard: Will build all the cards to be inserted
    let blockOneC = ""      // blockOneC: Will build one card at the time and will update/insert into bockCard
                            var nCnt = 1
                for (let nCnt=0; nCnt<team.length; nCnt++) {
                    cRole = team[nCnt].getRole()
                    // switch (team[nCnt].getRole()) {
                    switch (cRole) {
                        case 'Manager' :
                            blockOneC = 
                               `<div class="col-md-6 col-lg-3">
                                    <div class="card">
                                        <div class="card-block">  
                                            <div class="head-manager">
                                                <h3>${team[nCnt].name}</h3>
                                                <h5>Manager</h5>
                                            </div> 
                                            
                                            <p>Id: ${team[nCnt].id}</p>
                                            <hr>
                                            Email:<a href="mailto:${team[nCnt].email}">${team[nCnt].email}</a>
                                            <p>Office Number: ${team[nCnt].officeNumber}</p>
                
                                        </div>    
                                    </div>
                                </div>
                                `
                            break
        
                        case 'Engineer':
                            blockOneC =
                                `<div class="col-md-6 col-lg-3">
                                    <div class="card">
                                        <div class="card-block">
                                            <div class="head-engineer">
                                                <h3>${team[nCnt].name}</h3>
                                                <h5>Engineer</h5>
                                            </div> 
                                            <p>Id: ${team[nCnt].id}</p>
                                            <hr>
                                            Email:<a href="mailto:${team[nCnt].email}">${team[nCnt].email}</a>
                                            <p>Github: <a href="https://github.com/${team[nCnt].github}" target="_blank">${team[nCnt].github}</a></p>
                                        </div>
                                    </div>
                                </div>
                                `
                                break

                        case 'Intern'  :
                            blockOneC =
                                `<div class="col-md-6 col-lg-3">
                                    <div class="card">
                                        <div class="card-block">
                                            <div class="head-intern">
                                                <h3>${team[nCnt].name}</h3>
                                                <h5>Intern</h5>
                                            </div> 
                                            <p>Id: ${team[nCnt].id}</p>
                                            <hr>
                                            Email:<a href="mailto:${team[nCnt].email}">${team[nCnt].email}</a>
                                            <p>School ${team[nCnt].getSchool()}</p>
                                        </div>
                                    </div>
                                </div>
                                `
                                break
        
                    }

//                    console.log('-------- blockOneC --------', nCnt + " of " + team.length)
//                    console.log(blockOneC)

                    // if (nCnt>1) {
                    //     blockCard = blockCard + '<br/>'
                    // }
                    blockCard = blockCard + blockOneC

                }      // while (nCnt<team.length) {

//                console.log("================================FINAL STRING")
//                console.log(blockCard)

    blockFoot =
            `  </div>

            </div> 
        </body>
    </html>`

    allBlocks = blockHead + blockTitle + blockCard + blockFoot
    // fs.writeFileSync('./lib/index.html', blockHead + blockTitle + blockCard + blockFoot)  
    fs.writeFileSync('./dist/index.html', allBlocks)  
}
// End function - Generate HTML by Order which was entered




//------------
// Generate HTML sorted by role
const genSortHtml = () => {
    blockHead = 
    `<!DOCTYPE html>
        <html lang="en">
            <head>
                <title>Team Generator</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="../dist/style.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
            </head>
        <body>
        
        `

    blockTitle =
            `<div class="col-xs-1 company-title">
                <h1>Company Title</h1>
            </div>
            
            <br/>
            
            <div class="container">

                <div class="row">
                `

                let blockCard = ""      // blockCard: Will build all the cards to be inserted
                let blockOneC = ""      // blockOneC: Will build one card at the time and will update/insert into bockCard

                // Change logic, will loop 3 times Manager, Engineer, Intern
                for (let nRole=1; nRole<=3; nRole++) {
                    switch (nRole) {
                        case 1:
                            evalRole =  'Manager'
                            break
                        case 2:
                            evalRole =  'Engineer'
                            break
                        case 3:
                            evalRole =  'Intern'
                            break
                    }

                    // Create  < just1Role >  array as a filter from teams by 1 role 
                    const just1Role = team.filter(employees => employees.constructor.name == evalRole)

                    for (let nCnt=0; nCnt<just1Role.length; nCnt++) {
                        cRole = just1Role[nCnt].getRole()
                        // switch (team[nCnt].getRole()) {
                        // For this function <genSortHtml> since will loop by "just1Role" instead of "team"
                        switch (cRole) {
                            case 'Manager' :
                                blockOneC = 
                                `<div class="col-md-6 col-lg-3">
                                        <div class="card">
                                            <div class="card-block">  
                                                <div class="head-manager">
                                                    <h3>${just1Role[nCnt].name}</h3>
                                                    <h5>Manager</h5>
                                                </div> 
                                                
                                                <p>Id: ${just1Role[nCnt].id}</p>
                                                <hr>
                                                Email:<a href="mailto:${just1Role[nCnt].email}">${team[nCnt].email}</a>
                                                <p>Office Number: ${just1Role[nCnt].officeNumber}</p>
                    
                                            </div>    
                                        </div>
                                    </div>
                                    `
                                break
            
                            case 'Engineer':
//                                <p>Github: <a href="https://github.com/${team[nCnt].github}" target="_blank">${team[nCnt].github}</a></p>
                                blockOneC =
                                    `<div class="col-md-6 col-lg-3">
                                        <div class="card">
                                            <div class="card-block">
                                                <div class="head-engineer">
                                                    <h3>${just1Role[nCnt].name}</h3>
                                                    <h5>Engineer</h5>
                                                </div> 
                                                <p>Id: ${just1Role[nCnt].id}</p>
                                                <hr>
                                                Email:<a href="mailto:${just1Role[nCnt].email}">${just1Role[nCnt].email}</a>
                                                <p>Github: <a href="https://github.com/${just1Role[nCnt].github}" target="_blank">${just1Role[nCnt].github}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                    break

                            case 'Intern'  :
                                blockOneC =
                                    `<div class="col-md-6 col-lg-3">
                                        <div class="card">
                                            <div class="card-block">
                                                <div class="head-intern">
                                                    <h3>${just1Role[nCnt].name}</h3>
                                                    <h5>Intern</h5>
                                                </div> 
                                                <p>Id: ${just1Role[nCnt].id}</p>
                                                <hr>
                                                Email:<a href="mailto:${just1Role[nCnt].email}">${just1Role[nCnt].email}</a>
                                                <p>School ${just1Role[nCnt].getSchool()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    `
                                    break
            
                        }

//                        console.log('-------- blockOneC --------', nCnt + " of " + team.length)
//                        console.log(blockOneC)

                        // if (nCnt>1) {
                        //     blockCard = blockCard + '<br/>'
                        // }
                        blockCard = blockCard + blockOneC

                    }      // while (nCnt<team.length) {
                }          // for (let nRole=1; nRole<=3; nRol2++) {

//                console.log("================================FINAL STRING")
//                console.log(blockCard)

    blockFoot =
            `  </div>

            </div> 
        </body>
    </html>`

    allBlocks = blockHead + blockTitle + blockCard + blockFoot
    // fs.writeFileSync('./lib/index.html', blockHead + blockTitle + blockCard + blockFoot)  
    fs.writeFileSync('./dist/index.html', allBlocks)  
}
// End function - Generate HTML sorted by role
//------------



// Start program, calling askManager and then employeeMenu
askManager().then(answers => {
    const newManager = new Manager(answers.name, answers.EmployeeId, answers.emailAddress)
    newManager.officeNumber = answers.officeNumber

    team.push(newManager)

})
.then(()=>employeeMenu())

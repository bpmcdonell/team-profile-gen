// TODO: Include packages needed for this application
var inquirer = require('inquirer');
var fs = require('fs');

// TODO: Create an array of questions for user input
const questionsManager = [
    {
        type: 'input',
        name: 'manName',
        message: 'Please enter your name, manager.',
    },
    {
        type: 'input',
        name: 'manId',
        message: 'Please enter your ID, manager.',
    },
    {
        type: 'input',
        name: 'manEmail',
        message: 'Please enter your email, manager.',
    },
    {
        type: 'input',
        name: 'manOfficeNum',
        message: 'Please enter your office number, manager.',
    }
];

const questionsNext = [
    {
        type: 'list',
        name: 'next',
        message: 'What would you like to do next?',
        choices: ['Add an engineer', 'Add an intern', 'Finish building my team'],
    }
];

const questionsEngineer = [
    {
        type: 'input',
        name: 'engName',
        message: 'Please enter the name of the engineer',
    },
    {
        type: 'input',
        name: 'engId',
        message: 'Please enter the ID of the engineer',
    },
    {
        type: 'input',
        name: 'engEmail',
        message: 'Please enter the email of the engineer.',
    },
    {
        type: 'input',
        name: 'engGithub',
        message: 'Please enter the github of the engineer.',
    }
];

const questionsIntern = [
    {
        type: 'input',
        name: 'intName',
        message: 'Please enter the name of the intern.',
    },
    {
        type: 'input',
        name: 'intId',
        message: 'Please enter the ID of the intern.',
    },
    {
        type: 'input',
        name: 'intEmail',
        message: 'Please enter the E-Mail of the intern.',
    },
    {
        type: 'input',
        name: 'intSchool',
        message: 'Please enter the school the intern goes to.',
    }
];



const generateManHtml = ({ manName, manId, manEmail, manOfficeNum }) =>
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <title>My Team</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1 w-100 text-center">My Team</span>
            </div>
        </nav>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <div class="card" style="width: 18rem; margin: 2rem;">
                        <div class="card-block">
                            <div class="card-header">
                            <h3 class="card-title">${manName}</h3>
                            <h5 class="card-subtitle mb-2">Manager</h5>
                            </div>
                            <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">ID: ${manId}</li>
                                <li class="list-group-item">Email:<a href = mailto: ${manEmail}>${manEmail}></a></li>
                                <li class="list-group-item">Office Number: ${manOfficeNum}</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>`;

var generateEngHtml = ({ engName, engId, engEmail, engGithub }) =>
    `
            <div class="col-3 d-flex justify-content-center">
                <div class="card" style="width: 18rem; margin: 2rem;">
                    <div class="card-header">
                        <h3 class="card-title">${engName}</h3>
                        <h5 class="card-subtitle mb-2">Engineer</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${engId}</li>
                            <li class="list-group-item">Email: <a href = mailto: ${engEmail}>${engEmail}></a></li>
                            <li class="list-group-item">Github: <a href = https://www.github.com/${engGithub}>${engGithub}</a></li>
                        </ul>
                    </div>
                </div>
            </div>`;
var generateIntHtml = ({ intName, intId, intEmail, intSchool }) =>
    `
            <div class="col-3 d-flex justify-content-center">
                <div class="card" style="width: 18rem; margin: 2rem;">
                    <div class="card-header">
                        <h3 class="card-title">${intName}</h3>
                        <h5 class="card-subtitle mb-2">Intern</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${intId}</li>
                            <li class="list-group-item">Email: <a href = mailto: ${intEmail}>${intEmail}</a></li>
                            <li class="list-group-item">School: ${intSchool}</li>
                        </ul>
                    </div>
                </div>
            </div>
    `;

const generateEndHtml = () =>
    `
    </div>
    </div>
    </div>

</body>
</html>`;


function addEngineer() {
    inquirer.prompt(questionsEngineer)
        .then((answers) => {
            generateEngHtml(answers);
            fs.appendFile('./dist/index.html', generateEngHtml(answers), (err) =>
                err ? console.log(err) : null
            );
            next();
        })
}
function addIntern() {
    inquirer.prompt(questionsIntern)
        .then((answers) => {
            generateIntHtml(answers);
            fs.appendFile('./dist/index.html', generateIntHtml(answers), (err) =>
                err ? console.log(err) : null
            );
            next();
        })
}
// TODO: Create a function to initialize app
function init() {

    inquirer.prompt(questionsManager)
        .then((answers) => {
            generateManHtml(answers);
            fs.writeFile('./dist/index.html', generateManHtml(answers), (err) =>
                err ? console.log(err) : null
            );
            next();
        })

}

function next() {
    inquirer.prompt(questionsNext)
        .then((answers) => {
            if (answers.next === 'Add an engineer') {
                addEngineer();
            } else if (answers.next === 'Add an intern') {
                addIntern();
            } else {
                console.log('Thank you for using the Team Profile Generator!');
                fs.appendFile('./dist/index.html', generateEndHtml(), (err) =>
                    err ? console.log(err) : console.log('End Success!')
                )
            };
        })
};


// Function call to initialize app
init();

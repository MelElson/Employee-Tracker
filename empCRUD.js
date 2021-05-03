const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employee_DB',
});


const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View ALL Employees',
                'View ALL Employees by Department',
                'View ALL Employees by Manager',
                'Add Employee',
                'Remove Emloyee',
                'Update Employee Role',
                'Update Employee Manager',
                'exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View ALL Employees':
                    employeeSearch();
                    break;

                case 'View ALL Employees by Department':
                    departmentSearch();
                    break;

                case 'View ALL Employees by Manager':
                    mangerSearch();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;

                case 'Update Employee Manager':
                    UpdateManager();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

// const artistSearch = () => {
//     inquirer
//         .prompt({
//             name: 'artist',
//             type: 'input',
//             message: 'What artist would you like to search for?',
//         })
//         .then((answer) => {
//             const query = 'SELECT position, song, year FROM top5000 WHERE ?';
//             connection.query(query, { artist: answer.artist }, (err, res) => {
//                 if (err) throw err;
//                 res.forEach(({ position, song, year }) => {
//                     console.log(
//                         `Position: ${position} || Song: ${song} || Year: ${year}`
//                     );
//                 });
//                 runSearch();
//             });
//         });
// };

// const multiSearch = () => {
//     const query =
//         'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         res.forEach(({ artist }) => console.log(artist));
//         runSearch();
//     });
// };

// const rangeSearch = () => {
//     inquirer
//         .prompt([
//             {
//                 name: 'start',
//                 type: 'input',
//                 message: 'Enter starting position: ',
//                 validate(value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 },
//             },
//             {
//                 name: 'end',
//                 type: 'input',
//                 message: 'Enter ending position: ',
//                 validate(value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 },
//             },
//         ])
//         .then((answer) => {
//             const query =
//                 'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
//             connection.query(query, [answer.start, answer.end], (err, res) => {
//                 if (err) throw err;
//                 res.forEach(({ position, song, artist, year }) =>
//                     console.log(
//                         `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//                     )
//                 );
//                 runSearch();
//             });
//         });
// };

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});
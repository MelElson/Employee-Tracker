const mysql = require('mysql');
const inquirer = require('inquirer');

require('console.table');


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
                'View ALL Employees by Role',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Remove Emloyee',
                'Update Employee Role',
                'Update Employee Manager',
                'Exit',
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
                case 'View ALL Employees by Role':
                    roleSearch();
                    break;

                case 'View ALL Employees by Manager':
                    mangerSearch();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;
                    
                case 'Add Role':
                    addRole();
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


/////////////////--------------View Employees
const employeeSearch = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};
///////////-------------------View Department
const departmentSearch = () => {
    console.log('Selecting all department...\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

//////////------------------View Role
const roleSearch = () => {
    console.table('Selecting all role...\n');
    connection.query('SELECT * FROM empRole', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

///////---------------------Add Employee
const addEmployee = () => {
    connection.query('SELECT * FROM empRole', async function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "what is the employee's first name?",

                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name?",
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID?",
                },
                {
                    name: 'role_id',
                    type: 'list',
                    choices: function () {
                      var roleArray = [];
                      for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].empTitle);
                      }
                      return roleArray;
                    },
                    message: "What is this employee's role? "
                  },
                ]).then(function (answer) {
                    console.log("the role id is: ", answer.role_id)
                //   let role_id;
                //   for (let i = 0; i < res.length; i++) {
                //     if (res[i].empTitle == answer.role_id) {
                //       role_id = res[i].id;
                //       console.log(role_id)
                //     }
                //   }
                  connection.query(
                    'INSERT INTO employee SET ?', {
                      first_name: answer.first_name,
                      last_name: answer.last_name,
                      manager_id: answer.manager_id,
                      role_id: answer.role_id,
                    },
                    // (error) => {
                    //     if (error) throw err;
                    //     console.log('Your employee has been added!');
                    //     start();
                    
                    
                    function (err) {
                      if (err) throw err;
                      console.log('Your ${last_name} has been added!');
                      start();
                    })
                })
            })
          };

          
    ////////------------------Add Deptartment
    const addDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: 'department',
                type: 'input',
                message: "What department would you like to add? ",
            },
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?', {
                    name: answer.department,
                },
                    function (err) {
                        if (err) throw err;
                        console.log('Your department has been added!');
                        start();
                    })
            })
    })
   };

   /////////////////---------------Add Role
const addRole = () => {
    connection.query('SELECT * FROM empRole', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: 'empTitle',
                type: 'input',
                message: "What Employee role would you like to add? ",
            },
            {
                name: 'salary',
                type: 'input',
                message: "What is the salary?",
            },
            {
                name: 'department_id',
                type: 'input',
                message: "What is the department id?",
            },


            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO empRole SET ?', {
                    empTitle: answer.empTitle,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                    function (err) {
                        if (err) throw err;
                        console.log('Your new role has been added!');
                        start();
                    })
            })
    })
};


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});


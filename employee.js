const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',

  // port
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
        'View all employees',
        'View all employees by department',
        'View all employees by role',
        'View all employees by manager',
        'Add employee',
        'Add department',
        'Add role',
        'Remove employee',
        'Update employee role',
        'Update employee manager',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          employeeSearch();
          break;

        case 'View all employees by department':
          departmentSearch();
          break;

        case 'View all employees by role':
          roleSearch();
          break;

        case 'View all employees by manager':
          managerSearch();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Remove employee':
          removeEmployee();
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

//---------------------------view emp
const employeeSearch = () => {
  //ORDER BY column1 ASC;
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, empRole.title, department.name, empRole.salary FROM employee, empRole, department WHERE department.id = empRole.department_id AND empRole.id = employee.role_id ORDER BY employee.id ASC', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement

    console.table('All Employees', res);
    start();
  });

};

//----------------------------view dept
const departmentSearch = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table('All Departments', res);
    start();
  });

};



//------------------------------view roles
const roleSearch = () => {
  connection.query('SELECT * FROM empRole', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table('All Roles', res);

    start();
  });

};

//----------------------------view manager

const managerSearch = () => {
  connection.query('SELECT * FROM employee', (err, res) => {   ///?? add managers?
    if (err) throw err;
    // Log all results of the SELECT statement

    console.table('All Managers', res);

    start();
  });

};



//------------------------------add emp
const addEmployee = () => {
  connection.query('SELECT * FROM empRole', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
        name: 'first_name',
        type: 'input',
        message: "What is the employee's fist name? ",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the employee's last name? "
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the employee's manager's ID? "
      },
      {
        name: 'role',
        type: 'list',
        choices: function () {
          var roleArray = [];
          for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
          }
          return roleArray;
        },
        message: "What is this employee's role? "
      }
      ]).then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id)
          }
        }
        connection.query(
          'INSERT INTO employee SET ?', {
          first_name: answer.first_name,
          last_name: answer.last_name,
          manager_id: answer.manager_id,
          role_id: role_id,
        },
          function (err) {
            if (err) throw err;
            console.log('Your employee has been added!');
            start();
          })
      })
  })
};


//-----------------------------add Dept

const addDepartment = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([{
        name: 'department',
        type: 'input',
        message: "What department would you like to add? ",
      },]).then(function (answer) {
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



//------------------------------add role


const addRole = () => {
  connection.query('SELECT * FROM empRole', function (err, res) {
    connection.query('SELECT * FROM department', function (err, response_dept) {
      //this is equivalent to response_dept[i], i++, i< response_dept.length
      let departments = response_dept.map((dept) => {
        return { name: dept.name, value: dept.id }
      })

      if (err) throw err;
      inquirer
        .prompt([
          {
            name: 'title',
            type: 'input',
            message: "What Employee title would you like to add? ",
          },
          {
            name: 'salary',
            type: 'input',
            message: "What salary would you like for this role? ",
          },
          {
            name: 'department_id',
            type: 'list',
            choices: departments,
            message: "What is the department for this role? ",
          },

        ]).then(function (answer) {
          connection.query(
            'INSERT INTO empRole SET ?', {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id,
          },
            function (err) {
              if (err) throw err;
              console.log('Your new title has been added!');
              start();
            })
        })
    })
  })
};

//---------------------------------Remove Employee

// const removeEmployee = () => {
//   //  connection.query('SELECT * FROM employee', function (err, res) {
//   connection.query('SELECT * FROM employee', function (err, response_emp) {

//     let employees = response_emp.map((emp) => {
//       return { name: emp.last_name, value: emp.id }
//     })
//     if (err) throw err;
//     inquirer

//       .prompt([
//         {
//           name: 'employee_id',
//           type: 'list',
//           choices: employees,
//           message: "What employee do you want to remove? ",
//         },
//       ]).then(function (answer) {
//         connection.query(
//           'DELETE FROM employee_DB.employee ?', {
//           employee_id: answer.employee_id,
//         },
//           function (err) {
//             if (err) throw err;
//             console.log('The employee has been removed!');
//             start();
//           })
//       })
//   })
// };

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  start();
});

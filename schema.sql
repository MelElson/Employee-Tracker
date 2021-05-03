DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
    ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE department (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(100) NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE empRole (
    ID INT NOT NULL AUTO_INCREMENT,
    empTitle VARCHAR(100) NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NULL,
    PRIMARY KEY (ID)
);


-- SELECT * FROM employee_DB.department;
-- SELECT * FROM employee_DB.employee;
-- SELECT * FROM employee_DB.empRole;
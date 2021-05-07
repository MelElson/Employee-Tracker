USE employee_DB;
INSERT INTO department 
    (name)
VALUES
    ('Manager'),
    ('Web Dev'),
    ('Legal');
INSERT INTO empRole
    (title, salary, department_id)
VALUES
    ('Project Manager', 150000, 1),
    ('Full Stack Dev', 200000, 2),
    ('Lawyer', 250000, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Ad', 1, NULL),
    ('Joe', 'Nigjt', 2, NULL),
    ('John', 'Adams', 3, NULL);












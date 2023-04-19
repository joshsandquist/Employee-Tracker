USE employees;

INSERT INTO department (name)
VALUES 
    ('Golf Operations'),
    ('Grounds Maintenance'),
    ('Human Resources'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('General Manager', 150000, 1),
    ('Director of Golf', 120000, 1),
    ('Assistant Golf Professtional', 80000, 1),
    ('Outside Attendent', 60000, 1),
    ('Course Superintendent', 105000, 2),
    ('Course Attendent', 55000, 2),
    ('HR Director', 90000, 3),
    ('HR Representative', 65000, 3),
    ('Director of Accounting', 120000, 4),
    ('Accountant', 75000, 4);



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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, NULL),
    ('Dan', 'Erikson', 2, 1),
    ('Wyatt', 'Earp', 3, 2),
    ('Doc', 'Holliday', 4, 2),
    ('Ike', 'Clanton', 4, 2),
    ('Johnny', 'Ringo', 4, 2),
    ('Ty', 'Webb', 5, 1),
    ('Carl', 'Spackler', 6, 7),
    ('Danny', 'Noonan', 6, 7),
    ('Sheev', 'Palpetine', 7 ,1),
    ('Anakin', 'Skywalker', 8, 10),
    ('Leonardo', 'Fibonacci', 9, 1),
    ('Ada', 'Lovelace', 10, 12);
const db = require('./db/db');

db.viewAllEmployees((employees) => {
  console.table(employees);
});

db.viewAllDepartments((departments) => {
    console.table(departments);
  });

  db.viewAllRoles((roles) => {
    console.table(roles);
  });
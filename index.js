const db = require('./db/db');

db.viewAllEmployees((employees) => {
  console.table(employees);
});

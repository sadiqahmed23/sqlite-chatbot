const sqlite3 = require("sqlite3").verbose();

console.log("Initializing database connection...");

const db = new sqlite3.Database("company.db", (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to the SQLite database.");
  }
});

// Create tables
db.serialize(() => {
  console.log("🔹 Creating tables...");
  db.run(`
    CREATE TABLE IF NOT EXISTS Employees (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Department TEXT,
      Salary INTEGER,
      Hire_Date TEXT
    )
  `, (err) => {
    if (err) console.error("❌ Error creating Employees table:", err.message);
    else console.log("✅ Employees table created.");
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS Departments (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT,
      Manager TEXT
    )
  `, (err) => {
    if (err) console.error("❌ Error creating Departments table:", err.message);
    else console.log("✅ Departments table created.");
  });

  console.log("✅ Tables setup complete.");
});

// Insert Sample Data
db.serialize(() => {
  console.log("🔹 Inserting sample data...");
  
  const employees = [
    ["Alice", "Sales", 50000, "2021-01-15"],
    ["Bob", "Engineering", 70000, "2020-06-10"],
    ["Charlie", "Marketing", 60000, "2022-03-20"],
    ["David", "HR", 55000, "2019-09-01"],
    ["Eve", "IT", 75000, "2018-12-05"],
    ["Frank", "Finance", 65000, "2023-04-15"]
  ];

  const departments = [
    ["Sales", "Alice"],
    ["Engineering", "Bob"],
    ["Marketing", "Charlie"],
    ["HR", "David"],
    ["IT", "Eve"],
    ["Finance", "Frank"]
  ];

  employees.forEach(([name, department, salary, hireDate]) => {
    db.run(
      `INSERT INTO Employees (Name, Department, Salary, Hire_Date) VALUES (?, ?, ?, ?)`,
      [name, department, salary, hireDate],
      (err) => {
        if (err) console.error(`❌ Error inserting employee ${name}:`, err.message);
        else console.log(`✅ Inserted employee: ${name}`);
      }
    );
  });

  departments.forEach(([name, manager]) => {
    db.run(
      `INSERT INTO Departments (Name, Manager) VALUES (?, ?)`,
      [name, manager],
      (err) => {
        if (err) console.error(`❌ Error inserting department ${name}:`, err.message);
        else console.log(`✅ Inserted department: ${name}`);
      }
    );
  });

  console.log("✅ Sample data inserted.");
});

console.log("🔹 Closing database connection...");
db.close((err) => {
  if (err) {
    console.error("❌ Error closing database:", err.message);
  } else {
    console.log("✅ Database connection closed.");
  }
});

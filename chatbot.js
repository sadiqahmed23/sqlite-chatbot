const sqlite3 = require("sqlite3").verbose();
const readline = require("readline-sync");

const db = new sqlite3.Database("company.db");

// Function to handle user queries
function handleQuery(query, callback) {
  console.log("\n🔍 Received query:", query);

  query = query.toLowerCase().trim(); // Normalize query input

  // Query: Show all employees in a department
  if (query.startsWith("show me all employees in")) {
    const department = query.split(/in /i)[1]?.trim().replace(/[^\w\s]/g, "");
    console.log("📌 Extracted Department:", department);

    if (!department) {
      console.log("⚠️ No department extracted.");
      return callback(); // Continue chatbot loop
    }

    db.all(
      `SELECT Name, Salary, Hire_Date FROM Employees WHERE LOWER(Department) = LOWER(?)`, 
      [department], 
      (err, rows) => {
        if (err) {
          console.error("❌ SQL Error:", err.message);
        } else if (rows.length === 0) {
          console.log(`⚠️ No employees found in the ${department} department.`);
        } else {
          console.log(`✅ Employees in ${department}:`);
          rows.forEach((row) => {
            console.log(`- ${row.Name}, Salary: ${row.Salary}, Hired: ${row.Hire_Date}`);
          });
        }
        callback(); // Continue chatbot loop
      }
    );
  } 
  // Query: Get the manager of a department
  else if (query.startsWith("who is the manager of")) {
    const department = query.split(/of /i)[1]?.trim().replace(/[^\w\s]/g, "");
    console.log("📌 Extracted Department:", department);

    db.get(`SELECT Manager FROM Departments WHERE LOWER(Name) = LOWER(?)`, [department], (err, row) => {
      if (err) console.error("❌ SQL Error:", err.message);
      else if (!row) console.log(`⚠️ No manager found for the ${department} department.`);
      else console.log(`✅ The manager of ${department} is: ${row.Manager}`);
      callback(); // Continue chatbot loop
    });
  } 
  // Query: List employees hired after a certain date
  else if (query.startsWith("list all employees hired after")) {
    const date = query.split(/after /i)[1]?.trim();
    console.log("📌 Extracted Date:", date);

    db.all(`SELECT Name, Hire_Date FROM Employees WHERE Hire_Date > ?`, [date], (err, rows) => {
      if (err) console.error("❌ SQL Error:", err.message);
      else if (rows.length === 0) console.log(`⚠️ No employees found hired after ${date}.`);
      else {
        console.log(`✅ Employees hired after ${date}:`);
        rows.forEach((row) => console.log(`- ${row.Name}, Hired: ${row.Hire_Date}`));
      }
      callback(); // Continue chatbot loop
    });
  } 
  // Query: Get total salary expense for a department
  else if (query.startsWith("what is the total salary expense for")) {
    const department = query.split(/for /i)[1]?.trim().replace(/[^\w\s]/g, "");
    console.log("📌 Extracted Department:", department);

    db.get(`SELECT SUM(Salary) as Total FROM Employees WHERE LOWER(Department) = LOWER(?)`, [department], (err, row) => {
      if (err) console.error("❌ SQL Error:", err.message);
      else console.log(`✅ Total salary expense for ${department}: ${row?.Total || 0}`);
      callback(); // Continue chatbot loop
    });
  } 
  // Query: Get the highest-paid employee
  else if (query.startsWith("who is the highest-paid employee")) {
    db.get(`SELECT Name, Salary FROM Employees ORDER BY Salary DESC LIMIT 1`, [], (err, row) => {
      if (err) console.error("❌ SQL Error:", err.message);
      else if (!row) console.log("⚠️ No employees found.");
      else console.log(`✅ Highest-paid employee: ${row.Name}, Salary: ${row.Salary}`);
      callback(); // Continue chatbot loop
    });
  } 
  // Query: Count the number of employees in a department
  else if (query.startsWith("how many employees are in")) {
    const department = query.split(/in /i)[1]?.trim().replace(/[^\w\s]/g, "");
    console.log("📌 Extracted Department:", department);

    db.get(`SELECT COUNT(*) as Count FROM Employees WHERE LOWER(Department) = LOWER(?)`, [department], (err, row) => {
      if (err) console.error("❌ SQL Error:", err.message);
      else console.log(`✅ Total employees in ${department}: ${row?.Count || 0}`);
      callback(); // Continue chatbot loop
    });
  } 
  // Query: List employees earning above a certain salary
  else if (query.startsWith("list employees earning above")) {
    const salary = parseInt(query.split(/above /i)[1]?.trim());
    console.log("📌 Extracted Salary:", salary);

    db.all(`SELECT Name, Salary FROM Employees WHERE Salary > ?`, [salary], (err, rows) => {
      if (err) console.error("❌ SQL Error:", err.message);
      else if (rows.length === 0) console.log(`⚠️ No employees found earning above ${salary}.`);
      else {
        console.log(`✅ Employees earning above ${salary}:`);
        rows.forEach((row) => console.log(`- ${row.Name}, Salary: ${row.Salary}`));
      }
      callback(); // Continue chatbot loop
    });
  } 
  // Default response for unknown queries
  else {
    console.log("❌ Sorry, I didn't understand the query.");
    callback(); // Continue chatbot loop
  }
}

// Function to start the chatbot loop
function chat() {
  console.log("\n💬 Chatbot started! Type your query (or type 'exit' to quit)");

  function askNextQuery() {
    const query = readline.question("\n> ");
    if (query.toLowerCase() === "exit") {
      console.log("👋 Goodbye!");
      db.close();
    } else {
      handleQuery(query, askNextQuery);
    }
  }

  askNextQuery(); // Start chatbot loop
}

chat();

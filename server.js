const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure database file is in the right location
const dbPath = path.join(__dirname, "company.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

app.use(express.json());

// ✅ API Home Route (Test if API is live)
app.get("/", (req, res) => {
  res.send("✅ API is running successfully!");
});

// ✅ Query Route (Handles Employee Queries)
app.post("/query", (req, res) => {
  console.log("🔍 Received API Request:", req.body); // Debugging log

  if (!req.body || !req.body.query) {
    return res.status(400).json({ error: "Missing query in request body" });
  }

  const query = req.body.query.toLowerCase().trim();
  console.log("📌 Extracted Query:", query);

  if (query.includes("employees in")) {
    const department = query.split("in ")[1]?.trim();
    console.log("📌 Extracted Department:", department);

    db.all(`SELECT Name FROM Employees WHERE LOWER(Department) = LOWER(?)`, [department], (err, rows) => {
      if (err) {
        console.error("❌ SQL Error:", err.message);
        return res.json({ error: "Database error" });
      }
      console.log("✅ SQL Query Result:", rows);
      res.json({ employees: rows.map(row => row.Name) });
    });
  } else {
    res.status(404).json({ error: "Query not understood" });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

# 🗨️ SQLite Chatbot

A simple **chat assistant** that interacts with an **SQLite database** and answers user queries using **Node.js & Express.js**.

---

## 📌 Features
✅ Accepts natural language queries  
✅ Converts queries into SQL  
✅ Fetches data from SQLite  
✅ Provides a REST API for easy integration  

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/sadiqahmed23/sqlite-chatbot.git

cd sqlite-chatbot

## **2️⃣ Install Dependencies**

npm install

**3️⃣ Create the Database**

node database.js

**4️⃣ Start the Chatbot Locally**

node chatbot.js

**💬 You can now type queries like:**
> Show me all employees in IT
> Who is the manager of Finance?
> List all employees hired after 2020-01-01

---

## 🌍 Running the API Server

### **To run the chatbot as a REST API, start the server:**

node server.js

### **Then send a cURL request:**

curl -X POST http://localhost:3000/query -H "Content-Type: application/json" -d '{"query": "Show me all employees in Sales"}'

### **You should receive a JSON response like:**

{
  "employees": ["Alice"]
}

---

## 🔥 Deployment (Render)

### **1️⃣ Deploy on Render**

To deploy the chatbot API on Render, follow these steps:

 - Push your project to GitHub
 - Go to Render and create a new Web Service
 - Set Build Command:
npm install

 - Set Start Command:
node server.js
 - Click deploy

After deployment, your API will be live at:
https://sqlite-chatbot-gx4g.onrender.com

---
## **🛠️ Technologies Used**
- Node.js(Backend)
- SQLite(Database)
- Express.js(APi)

---
## **👨‍💻 Author**
Sadiq Ahmad Shaik

sadiqsworkspace23@gmail.com

https://github.com/sadiqahmed23


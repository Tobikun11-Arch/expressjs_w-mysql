# Express.js + MySQL CRUD API

This project demonstrates a simple **Express.js backend** connected to a **MySQL database** using `mysql2/promise`. It provides full CRUD (Create, Read, Update, Delete) operations for a `users` table.

---

## 🚀 Features
- Express.js server with RESTful routes
- MySQL connection pool using environment variables
- CRUD operations:
  - Create user
  - Read all users / single user
  - Update user (PATCH & PUT)
  - Delete single user / all users

---

## 📦 Prerequisites
Before running this project, ensure you have:

- [Node.js](https://nodejs.org/) installed
- [XAMPP](https://www.apachefriends.org/) or MySQL server running
- A database management tool (e.g., [DBeaver](https://dbeaver.io/), phpMyAdmin, or MySQL Workbench)

---

## ⚙️ Setup Instructions

1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install dependencies
npm install

3. Configure environment variables
Create a .env file in the project root:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname

4. Create the database and table
Using DBeaver, phpMyAdmin, or MySQL CLI:
CREATE DATABASE yourdbname;

USE yourdbname;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);


5. Run the server
`npm run dev`  
Server will run at: `http://localhost:5000`

---

## 📖 API Endpoints (Test with Postman)

### Root
- `GET /` → Hello World check  

### Users
- **POST /users** → Create new user  
Body (JSON):  
{
"first_name": "John",
"last_name": "Doe",
"email": "john@example.com",
"password": "12345"
}

- **GET /users** → Get all users  
- **GET /users/:id** → Get single user by ID  
- **PATCH /users/:id** → Update specific fields  
Example body:  
{
"email": "newemail@example.com"
}

- **PUT /users/:id** → Replace all fields  
Example body:  
{
"first_name": "Jane",
"last_name": "Smith",
"email": "jane@example.com",
"password": "67890"
}

- **DELETE /users/:id** → Delete single user  
- **DELETE /users** → Delete all users  

---

## 🛠️ Notes
- Use **XAMPP** to start MySQL service locally.  
- Manage your database with **DBeaver** or phpMyAdmin.  
- Test all endpoints using **Postman** (recommended).  
- Ensure `.env` matches your local MySQL credentials.  
- Passwords are stored as plain text in this demo

---

-- Tobikun11-Arch
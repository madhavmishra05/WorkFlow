# 💼 Workflow – Job Seeking Website

## 📌 Introduction

**Workflow** is a full-stack web-based job seeking platform designed to connect employers and job seekers in a simple and efficient way.

It enables companies to post job openings and allows job seekers to create profiles, search jobs, and apply easily. The platform simplifies the recruitment process by bringing both parties onto a single digital system.

---

## 🎯 Objectives

* Provide a centralized platform for job opportunities
* Help job seekers find relevant jobs easily
* Enable employers to find suitable candidates quickly
* Reduce manual effort in the recruitment process

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML, CSS
* Bootstrap

### Backend

* Java
* Spring Boot
* Maven

### Database

* PostgreSQL

### Tools

* Git & GitHub
* VS Code / IntelliJ IDEA
* REST APIs

---

## 🏗️ Project Structure

```bash
Workflow/
│
├── HRMS_Frontend/                # React Frontend
│   ├── public/                  # Static files
│   ├── src/                     # Source code
│   │   ├── components/          # UI components
│   │   ├── pages/               # Pages (Home, Login, Jobs)
│   │   ├── services/            # API calls
│   │   ├── assets/              # Images & styles
│   │   └── App.js               # Root component
│   ├── package.json
│
├── HRMS_Backend/                # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/            # Controllers, Services, Repos
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── target/
│   ├── pom.xml
│   ├── PostgreDatabaseSQL       # Database script
│   └── APIDocumentation.md
│
└── README.md
```

---

## ✨ Features

* User Registration & Login
* Secure Authentication
* Separate Dashboards:

  * Job Seekers
  * Employers
* Job Posting System
* Job Search & Filtering
* Resume/Profile Creation
* Application Tracking
* REST API Integration

---

## ⚙️ Installation & Setup

### 🔹 Clone Repository

```bash
git clone <your-repository-link>
cd Workflow
```

---

### 🔹 Frontend Setup

```bash
cd HRMS_Frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

### 🔹 Backend Setup

```bash
cd HRMS_Backend
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

---

### 🗄️ Database Setup

1. Install PostgreSQL
2. Create database (e.g. `hrms`)
3. Open:

```
HRMS_Backend/src/main/resources/application.properties
```

4. Update credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hrms
spring.datasource.username=your_username
spring.datasource.password=your_password
```

5. Run SQL file:

```
PostgreDatabaseSQL
```

---

## 🌐 API Documentation

After running backend:

```
http://localhost:8080/swagger-ui.html
```

---

## 📊 Advantages

* Centralized job platform
* Saves time for recruiters & candidates
* Easy job application process
* Improves hiring efficiency
* User-friendly interface
* Accessible anytime

---

## 🔐 Security

* Secure authentication system
* Protected user data
* Backend validation

---

## 🚀 Future Improvements

* AI-based job recommendations
* Email notifications
* Admin dashboard
* Resume parsing system
* Mobile application

---

## 📄 Conclusion

Workflow provides an efficient and modern solution for recruitment.
It improves the hiring experience by combining all functionalities into one platform and has strong potential for future scalability.

---

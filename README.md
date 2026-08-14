# Node.js Authentication Application

## Overview

Node.js Authentication Application is a backend authentication API built with Node.js, Express, PostgreSQL, and Sequelize.

The project implements a complete authentication flow, including user registration, email activation, login, logout, JWT authentication, refresh tokens, password reset, protected routes, and profile management.

The application uses PostgreSQL for persistent data storage and Nodemailer for sending activation and password reset emails.

## Key Features

* **User Registration:** Create a new account with name, email, and password.
* **Email Activation:** Send an activation email and activate the account using a unique token.
* **User Login:** Authenticate users using email and password.
* **JWT Authentication:** Generate access and refresh tokens for authenticated users.
* **Refresh Tokens:** Renew access tokens using refresh tokens.
* **Logout:** Remove the refresh token and end the authenticated session.
* **Protected Routes:** Restrict access to specific routes using authentication middleware.
* **Guest Routes:** Prevent authenticated users from accessing guest-only routes.
* **Password Reset:** Send a password reset email and allow users to create a new password.
* **Profile Management:** Update user name, password, and email.
* **Email Change Confirmation:** Confirm a new email address using a verification token.
* **Password Hashing:** Securely store passwords using bcrypt.
* **PostgreSQL Persistence:** Store users and refresh tokens in a PostgreSQL database.
* **Centralized Error Handling:** Handle application errors through custom middleware and API error classes.
* **Environment Configuration:** Store database credentials, JWT secrets, SMTP settings, and other sensitive values in environment variables.

## Challenges

Developing the application involved several backend-specific challenges related to authentication, security, token management, database relationships, and email verification.

### Key Challenges

* **Authentication Flow:** Coordinating registration, activation, login, logout, and protected routes required careful control of user authentication states.
* **JWT Management:** Implementing access and refresh tokens required secure token generation, verification, storage, and renewal.
* **Refresh Token Persistence:** Refresh tokens are stored in PostgreSQL and associated with individual users.
* **Email Verification:** Registration, password reset, and email change functionality required generating secure tokens and sending transactional emails.
* **Password Security:** User passwords are hashed with bcrypt before being stored in the database.
* **Database Relationships:** Sequelize models are used to manage relationships between users and authentication tokens.
* **Middleware:** Authentication, guest access, and centralized error handling are implemented through custom Express middleware.
* **Environment Security:** Sensitive information such as database passwords, SMTP credentials, and JWT secrets is stored in a local `.env` file and excluded from Git.

These challenges were addressed through modular application architecture, service-based logic, middleware, environment configuration, and database-backed authentication.

## Installation & Setup

To install the project and run it locally, follow these steps.

### Clone the repository

```bash
git clone https://github.com/Inna-code10/node-auth-app.git
```

### Navigate to the project directory

```bash
cd node-auth-app
```

### Install dependencies

```bash
npm install
```

### Create environment variables

Create a `.env` file in the root directory using `.env.example` as a template.

Example:

```env
PORT=3005
NODE_ENV=development

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_DATABASE=postgres

CLIENT_HOST=http://localhost:5173
API_HOST=http://localhost:3005

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password

JWT_KEY=your_jwt_secret
JWT_REFRESH_KEY=your_refresh_jwt_secret
```

Do not commit the `.env` file to GitHub.

### Start the application

```bash
npm start
```

For development with automatic server restart:

```bash
npm run dev
```

### Run ESLint

```bash
npm run lint
```

## Technologies Used

* **Node.js:** JavaScript runtime used to build the backend application.
* **Express.js:** Web framework used for API routes and middleware.
* **PostgreSQL:** Relational database used for persistent application data.
* **Sequelize:** ORM used to communicate with PostgreSQL and define database models.
* **bcrypt:** Used to hash and verify user passwords.
* **JSON Web Token (JWT):** Used for access and refresh token authentication.
* **Nodemailer:** Used to send activation, password reset, and email confirmation messages.
* **cookie-parser:** Used to work with cookies in Express.
* **CORS:** Used to configure cross-origin requests between client and server.
* **dotenv:** Used to load environment variables from `.env`.
* **UUID:** Used to generate unique activation and verification tokens.
* **Nodemon:** Used during development to restart the server automatically when files change.
* **ESLint:** Used for JavaScript code linting and code quality checks.

## Project Structure

```text
src/
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── exeptions/
│   └── api.error.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── guestMiddleware.js
├── models/
│   ├── token.js
│   └── user.js
├── routes/
│   ├── auth.route.js
│   └── user.route.js
├── services/
│   ├── email.service.js
│   ├── jwt.service.js
│   ├── token.service.js
│   └── user.service.js
├── utils/
│   ├── catchError.js
│   ├── db.js
│   └── validation.js
└── index.js
```

## Security

The project follows several important security practices:

* passwords are hashed before being stored;
* access and refresh tokens are generated separately;
* refresh tokens are stored in the database;
* sensitive environment variables are excluded from Git;
* protected routes require authentication;
* email activation is required before normal account usage;
* password reset and email change operations use temporary verification tokens.

## Repository

GitHub:

`https://github.com/Inna-code10/node-auth-app`

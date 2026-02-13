# CRM Application

A Node.js/Express-based Customer Relationship Management (CRM) system built for backend development practice. This application provides user authentication, user management, and ticket management capabilities.

## Features

- **User Authentication**: Secure login and signup with JWT tokens
- **User Management**: Admin controls for managing users and their status
- **Ticket Management**: Create and manage support tickets
- **Role-Based Access Control**: Different access levels for Admin and regular users
- **Password Encryption**: Secure password storage using bcrypt

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB (via Mongoose 9.0.1)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Bcrypt for password hashing
- **Environment**: dotenv for configuration

## Project Structure

```
crm/
├── index.js                          # Application entry point
├── package.json                      # Project dependencies
├── config/
│   └── db.js                        # MongoDB connection configuration
├── controllers/
│   ├── auth.controller.js           # Authentication logic
│   ├── ticket.controller.js         # Ticket management logic
│   └── user.controller.js           # User management logic
├── middlewares/
│   ├── authMiddleware.js            # JWT verification and admin checks
│   ├── validateTicketBody.js        # Ticket validation
│   └── validateUser.js              # User data validation
├── models/
│   ├── ticket.model.js              # Ticket database schema
│   └── user.model.js                # User database schema
├── routes/
│   ├── auth.route.js                # Authentication endpoints
│   ├── ticket.route.js              # Ticket endpoints
│   └── user.route.js                # User endpoints
└── utils/
    ├── constants.js                 # Application constants
    └── objectConverter.js           # Utility functions
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   Create a `.env` file in the root directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/crm
   JWT_SECRET=your_jwt_secret_key
   ```

## Running the Application

- **Development mode** (with hot reload using nodemon):
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  node index.js
  ```

The application will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Base URL
```
http://localhost:5000/crm/api/v1
```

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user and receive JWT token |

### User Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/users` | Get all users | Yes (Admin only) |
| GET | `/users/:id` | Get specific user details | Yes |
| PATCH | `/users/:id` | Update user status/type | Yes (Admin only) |

### Ticket Routes
Manage support tickets and issue tracking.

## Default Admin User

The application automatically creates a default admin user on startup if one doesn't exist:
- **Email**: atif@gmail.com
- **Password**: 123
- **User Type**: ADMIN
- **Status**: APPROVED

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in via `/login` endpoint
2. Server returns a JWT token
3. Include token in subsequent requests in the `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```

## Middleware

- **authMiddleware.js**: Verifies JWT tokens and checks admin privileges
- **validateUser.js**: Validates user input and status/type modifications
- **validateTicketBody.js**: Validates ticket-related data

## Database Models

### User Model
- User ID
- Name
- Email
- Password (hashed)
- User Type (Admin/User)
- User Status (Approved/Pending)

### Ticket Model
- Ticket details for issue tracking and support management

## Development Notes

This project is built as a backend development practice exercise and includes:
- Secure authentication with JWT and bcrypt
- MongoDB integration with Mongoose ODM
- RESTful API design
- Middleware-based request validation
- Role-based access control

## Future Enhancements

- Comprehensive test suite
- API documentation (Swagger/OpenAPI)
- Email notifications
- Advanced ticket filtering and search
- User profile management
- Audit logging

## Author

Aatif


# Latch Microservices API

Latch is a microservices-based application designed to help CS and IT graduates find and network with mentors. The application consists of multiple services, each handling a specific part of the functionality, such as user management, groups, mentorship, jobs, events, resources, messages, and notifications. The services are integrated and managed via an API Gateway.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Microservices](#microservices)
   - [User Service](#user-service)
   - [Group Service](#group-service)
   - [Mentorship Service](#mentorship-service)
   - [Job Service](#job-service)
   - [Event Service](#event-service)
   - [Resource Service](#resource-service)
   - [Message Service](#message-service)
   - [Notification Service](#notification-service)
3. [API Gateway](#api-gateway)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Security](#security)
7. [Environment Variables](#environment-variables)
8. [Testing](#testing)

## Project Structure

```
Latch/
│
├── api-gateway/
│   ├── config/
│   │   ├── system.config.yml
│   │   ├── gateway.config.yml
│   │   └── models/
│   │       ├── applications.json
│   │       ├── credentials.json
│   │       ├── tokens.json
│   │       └── users.json
│   ├── node_modules/
│   ├── package.json
│   └── server.js
│
├── user-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── server.js
│
├── group-service/
│   ├── ...
│
├── mentorship-service/
│   ├── ...
│
├── job-service/
│   ├── ...
│
├── event-service/
│   ├── ...
│
├── resource-service/
│   ├── ...
│
├── message-service/
│   ├── ...
│
└── notification-service/
    ├── ...
```

## Microservices

### User Service

Handles user registration, authentication, and user profile management.

- **Port:** 3000

### Group Service

Manages groups and group memberships.

- **Port:** 3001

### Mentorship Service

Handles mentorship relationships and mentorship sessions.

- **Port:** 3002

### Job Service

Manages job postings and applications.

- **Port:** 3003

### Event Service

Handles event creation and participation.

- **Port:** 3004

### Resource Service

Manages resources like articles, videos, and documents.

- **Port:** 3005

### Message Service

Handles sending and receiving messages between users.

- **Port:** 3006

### Notification Service

Manages notifications and alerts for users.

- **Port:** 3007

## API Gateway

The API Gateway is configured to route requests to the appropriate microservices. It also handles authentication, logging, and other cross-cutting concerns.

### Configuration Files

- **`system.config.yml`**: System-wide settings for the gateway.
- **`gateway.config.yml`**: API endpoints, service endpoints, and policies configuration.

### Example Configuration (`gateway.config.yml`)

```yaml
http:
  port: 8080

admin:
  port: 9876
  host: localhost

apiEndpoints:
  user:
    host: "*"
    paths: "/api/users/*"
  group:
    host: "*"
    paths: "/api/groups/*"
  mentorship:
    host: "*"
    paths: "/api/mentorships/*"
  job:
    host: "*"
    paths: "/api/jobs/*"
  event:
    host: "*"
    paths: "/api/events/*"
  resource:
    host: "*"
    paths: "/api/resources/*"
  message:
    host: "*"
    paths: "/api/messages/*"
  notification:
    host: "*"
    paths: "/api/notifications/*"

serviceEndpoints:
  userService:
    url: "http://localhost:3000"
  groupService:
    url: "http://localhost:3001"
  mentorshipService:
    url: "http://localhost:3002"
  jobService:
    url: "http://localhost:3003"
  eventService:
    url: "http://localhost:3004"
  resourceService:
    url: "http://localhost:3005"
  messageService:
    url: "http://localhost:3006"
  notificationService:
    url: "http://localhost:3007"

policies:
  - proxy
  - cors
  - log

pipelines:
  default:
    apiEndpoints:
      - user
      - group
      - mentorship
      - job
      - event
      - resource
      - message
      - notification
    policies:
      - cors:
          - action:
              origin: "*"
              methods: "GET,PUT,POST,DELETE"
      - log:
          - action:
              message: "Request received"
      - proxy:
          - action:
              serviceEndpoint: userService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: groupService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: mentorshipService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: jobService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: eventService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: resourceService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: messageService
              changeOrigin: true
              strategy: round-robin
      - proxy:
          - action:
              serviceEndpoint: notificationService
              changeOrigin: true
              strategy: round-robin
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/latch.git
   cd latch
   ```

2. **Install dependencies for each microservice and the API Gateway:**

   ```bash
   cd user-service
   npm install
   cd ../group-service
   npm install
   cd ../mentorship-service
   npm install
   cd ../job-service
   npm install
   cd ../event-service
   npm install
   cd ../resource-service
   npm install
   cd ../message-service
   npm install
   cd ../notification-service
   npm install
   cd ../api-gateway
   npm install
   ```

## Running the Application

1. **Start each microservice:**

   ```bash
   # In separate terminal windows or using a process manager like PM2
   cd user-service && npm start
   cd ../group-service && npm start
   cd ../mentorship-service && npm start
   cd ../job-service && npm start
   cd ../event-service && npm start
   cd ../resource-service && npm start
   cd ../message-service && npm start
   cd ../notification-service && npm start
   ```

2. **Start the API Gateway:**

   ```bash
   cd api-gateway
   eg start
   ```

## Security

The API Gateway uses JWT (JSON Web Tokens) for authentication. Each service has middleware to verify tokens and protect endpoints.

### JWT Middleware Example

**`middlewares/auth.js`**:
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
```

## Environment Variables

Each service has an `.env` file to configure environment-specific settings, such as database connection strings and JWT secrets.

**Example `.env` file**:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Testing

Use Postman or curl to test the endpoints through the API Gateway.

**Example curl command to get users**:
```bash
curl -X GET http://localhost:8080/api/users
```

**Example curl command to create a job**:
```bash
curl -X POST http://localhost:8080/api/jobs   -H "Authorization: Bearer YOUR_JWT_TOKEN"   -H "Content-Type: application/json"   -d '{"title":"Software Engineer", "description":"Develop and maintain software", "company":"Tech Corp", "location":"New York", "salary":120000}'
```

Replace `YOUR_JWT_TOKEN` with an appropriate value.

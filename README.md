# Task Management System

A modern, full-stack task management application built with React, TypeScript, Node.js, and real-time Socket.io integration. This system enables users to create, assign, update, and track tasks with real-time notifications and updates.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Contract Documentation](#api-contract-documentation)
- [Architecture Overview](#architecture-overview)
- [Design Decisions](#design-decisions)
- [Socket.io Integration](#socketio-integration)
- [Trade-offs & Assumptions](#trade-offs--assumptions)

## ✨ Features

- **User Authentication**: JWT-based authentication with secure cookie storage
- **Task Management**: Create, read, update, and delete tasks
- **Task Assignment**: Assign tasks to team members
- **Real-time Updates**: Socket.io integration for live task updates and notifications
- **Task Filtering**: Filter tasks by status, priority, and assignment
- **Dashboard Statistics**: Visual overview of task distribution
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Type Safety**: Full TypeScript implementation across the stack

## 🛠 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state management
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **TailwindCSS** - Styling
- **shadcn/ui** - Re-usable component library built on Radix UI primitives
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Prisma** - Database ORM with TypeScript support
- **Socket.io** - Real-time communication
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm package manager
- Git
- MongoDB (v6.0 or higher) - Local installation or MongoDB Atlas account
- Backend server running (see Backend Setup below)

### Frontend Setup

1. **Clone the repository**
   ```powershell
   git clone <repository-url>
   cd task-management-system-frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Run the development server**
   ```powershell
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```powershell
   npm run build
   npm run preview
   ```

### Backend Setup

1. **Clone the backend repository** (if separate)
   ```powershell
   git clone <backend-repository-url>
   cd task-management-system-backend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend root:
   ```env
   PORT=8080
   DATABASE_URL=mongodb://localhost:27017/taskdb
   # Or for MongoDB Atlas:
   # DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/taskdb
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Database setup**
   ```powershell
   # Ensure MongoDB is running locally
   # Or use MongoDB Atlas for cloud-hosted database
   
   # Generate Prisma Client
   npx prisma generate
   
   # Push the schema to MongoDB (creates collections)
   npx prisma db push
   ```

5. **Run the backend server**
   ```powershell
   npm run dev
   ```
   
   The API will be available at `http://localhost:8080`

### Running Both Services

For development, run both frontend and backend concurrently in separate terminal windows:

**Terminal 1 (Backend):**
```powershell
cd task-management-system-backend
npm run dev
```

**Terminal 2 (Frontend):**
```powershell
cd task-management-system-frontend
npm run dev
```

## 📡 API Contract Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Note: JWT token is set as an HTTP-only cookie
```

#### 3. Get Current User Profile
```http
GET /api/auth/me
Cookie: token=<jwt-token>

Response (200):
{
  "message": "Profile fetched successfully",
  "profile": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 4. Logout
```http
POST /api/auth/logout
Cookie: token=<jwt-token>

Response (200):
{
  "message": "Logout successful"
}

Note: Clears the JWT cookie
```

### Task Endpoints

#### 1. Get All Tasks
```http
GET /api/tasks
Cookie: token=<jwt-token>

Query Parameters (optional):
- status: TODO | IN_PROGRESS | REVIEW | COMPLETED
- priority: LOW | MEDIUM | HIGH | URGENT
- assignedToId: string (user ID)
- creatorId: string (user ID)

Response (200):
{
  "message": "Tasks fetched successfully",
  "tasks": [
    {
      "id": "uuid",
      "title": "Implement login feature",
      "description": "Add JWT authentication",
      "dueDate": "2025-12-31T00:00:00.000Z",
      "priority": "HIGH",
      "status": "IN_PROGRESS",
      "creatorId": "uuid",
      "creator": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "assignedToId": "uuid",
      "assignedTo": {
        "id": "uuid",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "createdAt": "2025-12-20T10:00:00.000Z",
      "updatedAt": "2025-12-27T15:30:00.000Z"
    }
  ]
}
```

#### 2. Get Task by ID
```http
GET /api/tasks/:id
Cookie: token=<jwt-token>

Response (200):
{
  "message": "Task fetched successfully",
  "task": {
    "id": "uuid",
    "title": "Implement login feature",
    "description": "Add JWT authentication",
    "dueDate": "2025-12-31T00:00:00.000Z",
    "priority": "HIGH",
    "status": "IN_PROGRESS",
    "creatorId": "uuid",
    "creator": { ... },
    "assignedToId": "uuid",
    "assignedTo": { ... },
    "createdAt": "2025-12-20T10:00:00.000Z",
    "updatedAt": "2025-12-27T15:30:00.000Z"
  }
}
```

#### 3. Create Task
```http
POST /api/tasks
Cookie: token=<jwt-token>
Content-Type: application/json

Request Body:
{
  "title": "Implement login feature",
  "description": "Add JWT authentication",
  "dueDate": "2025-12-31",
  "priority": "HIGH",
  "assignedToId": "uuid" // optional
}

Response (201):
{
  "message": "Task created successfully",
  "task": { ... }
}
```

#### 4. Update Task
```http
PATCH /api/tasks/:id
Cookie: token=<jwt-token>
Content-Type: application/json

Request Body (all fields optional):
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2025-12-31",
  "priority": "URGENT",
  "status": "COMPLETED",
  "assignedToId": "uuid"
}

Response (200):
{
  "message": "Task updated successfully",
  "task": { ... }
}
```

#### 5. Delete Task
```http
DELETE /api/tasks/:id
Cookie: token=<jwt-token>

Response (200):
{
  "message": "Task deleted successfully"
}
```

### User Endpoints

#### Get All Users
```http
GET /api/users
Cookie: token=<jwt-token>

Response (200):
{
  "message": "Users fetched successfully",
  "users": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

### Socket.io Events

#### Client → Server
- `connection` - Establish socket connection with authentication

#### Server → Client
- `task:updated` - Emitted when a task is updated
- `task:deleted` - Emitted when a task is deleted
- `task:assigned` - Emitted when a task is assigned to a user
- `connect` - Socket connection established
- `disconnect` - Socket disconnected
- `reconnect` - Socket reconnected
- `connect_error` - Connection error occurred

## 🏗 Architecture Overview

### Frontend Architecture

```
src/
├── api/                    # API configuration
│   ├── axios.ts           # Axios instance with interceptors
│   └── socket.ts          # Socket.io client setup
├── modules/               # Feature modules (domain-driven)
│   ├── auth/             # Authentication module
│   │   ├── auth.hooks.ts     # React Query hooks
│   │   ├── auth.schema.ts    # Zod validation schemas
│   │   ├── auth.service.ts   # API service calls
│   │   ├── auth.store.ts     # Zustand state management
│   │   └── auth.types.ts     # TypeScript types
│   ├── tasks/            # Task management module
│   │   ├── task.hooks.ts     # React Query hooks
│   │   ├── task.schema.ts    # Zod schemas
│   │   ├── task.service.ts   # API calls
│   │   ├── task.socket.ts    # Socket.io event handlers
│   │   ├── task.store.ts     # State management
│   │   └── task.types.ts     # Types
│   └── users/            # User management module
├── components/            # React components
│   ├── ui/               # shadcn/ui components (Radix UI primitives)
│   ├── task/             # Task-specific components
│   ├── dashboard/        # Dashboard components
│   └── notification/     # Notification components
├── pages/                # Page components
├── layouts/              # Layout components
├── router/               # React Router configuration
├── stores/               # Global stores
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
└── constants/            # Application constants
```

## 🎯 Design Decisions

### 1. **Module-Based Architecture**
   
**Decision**: Organized code into feature modules (auth, tasks, users) rather than technical layers (controllers, services, models).

**Rationale**: 
- Better code organization and maintainability
- Easier to understand the complete feature flow
- Simplifies testing and reduces coupling
- Each module is self-contained with its own types, hooks, services, and schemas

### 2. **State Management Strategy**

**Decision**: Hybrid approach using TanStack Query for server state and Zustand for client state.

**Rationale**:
- **TanStack Query**: Perfect for server state (tasks, users) with built-in caching, refetching, and optimistic updates
- **Zustand**: Lightweight solution for client state (UI state, theme, filters)
- Avoids over-engineering with Redux for simple client state needs
- Better separation of concerns between server and client state

### 3. **JWT in HTTP-Only Cookies**

**Decision**: Store JWT tokens in HTTP-only cookies instead of localStorage.

**Rationale**:
- **Security**: Immune to XSS attacks (JavaScript cannot access HTTP-only cookies)
- **Automatic handling**: Cookies are automatically sent with requests
- Trade-off: Requires proper CORS configuration

### 4. **Database Choice** (MongoDB with Prisma)

**Decision**: MongoDB with Prisma ORM.

**Rationale**:
- **Flexibility**: Document-based structure allows for easy schema evolution as requirements change
- **Prisma benefits**: Type-safe queries, excellent TypeScript integration, automatic type generation
- **Performance**: Fast read/write operations, efficient for task management workloads
- **Developer Experience**: Prisma provides relational-like queries on MongoDB with excellent TypeScript support
- **Scalability**: Horizontal scaling with replica sets and sharding capabilities
- **Atlas Integration**: Easy cloud deployment with MongoDB Atlas

**Why Prisma over Mongoose**:
- **Type Safety**: Automatic TypeScript types generated from schema
- **Modern API**: Intuitive query syntax compared to Mongoose
- **Migration-less**: `prisma db push` for rapid development without complex migrations
- **Better DX**: Auto-completion and compile-time error checking

**Trade-offs**:
- MongoDB lacks traditional ACID transactions across documents (though multi-document transactions are supported)
- Relational queries require embedded documents or manual population
- No foreign key constraints at database level (handled at application level)

### 5. **Real-time with Socket.io**

**Decision**: Socket.io for real-time features instead of WebSocket API or Server-Sent Events.

**Rationale**:
- **Fallback support**: Automatically falls back to polling if WebSocket fails
- **Room support**: Easy to broadcast updates to specific users or groups
- **Authentication**: Built-in middleware for JWT verification
- **Reconnection**: Automatic reconnection with configurable attempts
- **Bi-directional**: Supports both client and server-initiated communication

### 6. **Form Validation with Zod**

**Decision**: Zod for runtime validation with React Hook Form.

**Rationale**:
- **Type inference**: Automatically generates TypeScript types from schemas
- **Reusable schemas**: Same schema for frontend validation and backend (if using TypeScript)
- **Better DX**: Clear error messages and chainable validators
- **Performance**: Lightweight compared to Yup or Joi

### 7. **Component Library**

**Decision**: shadcn/ui component library built on Radix UI primitives.

**Rationale**:
- **Copy-paste approach**: Components live in your codebase, not node_modules
- **Full customization**: Complete control over component code and styling
- **Accessibility**: Built on Radix UI primitives (WAI-ARIA compliant)
- **TailwindCSS integration**: Seamless styling with utility classes
- **Type-safe**: Full TypeScript support throughout

### 8. **Vite over Create React App**

**Decision**: Vite as the build tool.

**Rationale**:
- **Speed**: Significantly faster HMR and build times
- **Modern**: Uses native ES modules in development
- **Better DX**: Faster feedback loop during development
- **Future-proof**: Create React App is no longer actively maintained

## 🔌 Socket.io Integration

### Overview

Socket.io provides real-time, bidirectional communication between the client and server, enabling instant updates when tasks are created, updated, deleted, or assigned.

### Implementation Details

#### 1. **Client-Side Setup**

**Key Features**:
- Singleton pattern ensures one socket instance
- Auto-reconnection with configurable attempts (5 attempts, 1s delay)
- Graceful degradation: WebSocket → Polling fallback
- Cookie-based authentication with JWT
- Automatic reconnection handling for network interruptions

#### 2. **Event Handlers**

**Real-time Events**:
- `task:updated` - Invalidates query cache, shows toast notification
- `task:deleted` - Refreshes task list, notifies user
- `task:assigned` - Updates UI, notifies assignee
- Connection events - Handles connect/disconnect/reconnect states

**Integration with React Query**:
- Socket events trigger query cache invalidation
- UI stays in sync with server state automatically

#### 3. **Server-Side Setup**

**Backend Implementation**:
- CORS configured with credentials support
- JWT authentication middleware for socket connections
- Event emission: Broadcast to all users or target specific users
- Room support for user-specific notifications

### Real-time Flow Example

1. **User A updates a task**:
   ```
   Client A → PATCH /api/tasks/123 → Server
   ```

2. **Server processes and broadcasts**:
   ```
   Server → Database (update task)
   Server → Socket.io emit('task:updated', task)
   ```

3. **All connected clients receive update**:
   ```
   Server → Client B (Socket.io)
   Client B → React Query invalidates cache
   Client B → UI re-renders with new data
   Client B → Toast notification shown
   ```

### Benefits

- **Instant feedback**: Users see changes immediately without refreshing
- **Collaboration**: Multiple users can work on tasks simultaneously
- **Notifications**: Real-time alerts for task assignments and updates
- **Offline resilience**: Automatic reconnection when connection is restored

## ⚖️ Trade-offs & Assumptions

### Trade-offs Made

1. **HTTP-Only Cookies vs. localStorage**
   - ✅ **Chosen**: HTTP-only cookies for JWT
   - **Trade-off**: More complex CORS setup, can't access token in JS
   - **Benefit**: Better security against XSS attacks

2. **Real-time Updates vs. Polling**
   - ✅ **Chosen**: Socket.io for real-time
   - **Trade-off**: Additional server resources, more complex setup
   - **Benefit**: Better UX, instant updates, scalable with Redis adapter

3. **TanStack Query vs. Redux**
   - ✅ **Chosen**: TanStack Query + Zustand
   - **Trade-off**: Learning curve for team familiar with Redux
   - **Benefit**: Less boilerplate, automatic caching, better server state handling

4. **Module-based vs. Layer-based Architecture**
   - ✅ **Chosen**: Module-based (feature-first)
   - **Trade-off**: May duplicate some code across modules
   - **Benefit**: Better encapsulation, easier to understand and maintain

5. **shadcn/ui vs. Complete UI Library**
   - ✅ **Chosen**: shadcn/ui (copy-paste components)
   - **Trade-off**: Components in codebase require manual updates
   - **Benefit**: Full ownership, easy customization, no package dependency issues

### Assumptions Made

1. **User Authentication**
   - All task operations require authentication
   - Users can only see tasks they created or are assigned to
   - JWT expiration is handled on backend with refresh logic

2. **Task Permissions**
   - Task creators can update/delete their tasks
   - Assigned users can update task status
   - Admin role may be needed for future (not implemented)

3. **Real-time Requirements**
   - All users should see task updates in real-time
   - Network interruptions should be handled gracefully
   - Socket.io fallback to polling is acceptable

4. **Database Schema**
   - MongoDB with Prisma ORM for type-safe database access
   - Tasks have one creator and one assignee (not multiple assignees)
   - User references stored as ObjectId with Prisma relations
   - Indexes created on frequently queried fields (userId, status, priority)

6. **Browser Support**
   - Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
   - ES2020+ JavaScript features used
   - No IE11 support

7. **Environment**
   - Development and production environments clearly separated
   - Environment variables managed securely
   - HTTPS required in production for secure cookies

8. **Error Handling**
   - Network errors shown as toast notifications
   - Form validation errors inline
   - 401 errors trigger automatic logout
   - All errors logged (console in dev, service in production)

## 📝 Additional Notes

### Code Quality Tools

- **Biome**: Fast linter and formatter (ESLint + Prettier alternative)
- **TypeScript**: Strict mode enabled for maximum type safety
- **React Compiler**: Automatic memoization (experimental)

### Deployment

**Frontend** (Vercel):
- Build: `npm run build`
- Deploy the `dist/` folder

**Backend** (Render):
- Build: `npm run build`
- Start: `npm start`
- Note: Ensure Socket.io supports
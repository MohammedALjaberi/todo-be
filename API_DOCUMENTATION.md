# Todo API Documentation

A RESTful API for managing tasks built with Express.js, MongoDB Atlas, and Prisma.

## Base URL

```
http://localhost:3000
```

## Task Status Values

- `TODO` - Task is not started (default)
- `IN_PROGRESS` - Task is in progress
- `DONE` - Task is completed

---

## API Endpoints

### 1. Create Task

Create a new task.

**Endpoint:** `POST /api/tasks`

**Request Body:**

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "TODO",
  "startDate": "2024-10-18T10:00:00Z",
  "endDate": "2024-10-20T18:00:00Z"
}
```

**Required Fields:**

- `title` (string) - Task title

**Optional Fields:**

- `description` (string) - Task description
- `status` (string) - Task status: `TODO`, `IN_PROGRESS`, or `DONE` (default: `TODO`)
- `startDate` (ISO 8601 date string) - Task start date
- `endDate` (ISO 8601 date string) - Task end date

**Success Response (201):**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "6530f3a2b8c9d4e5f6a7b8c9",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "TODO",
    "startDate": "2024-10-18T10:00:00.000Z",
    "endDate": "2024-10-20T18:00:00.000Z",
    "createdAt": "2024-10-18T08:30:00.000Z",
    "updatedAt": "2024-10-18T08:30:00.000Z"
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Title is required"
}
```

---

### 2. Get All Tasks

Retrieve all tasks with optional filtering and sorting.

**Endpoint:** `GET /api/tasks`

**Query Parameters:**

- `status` (optional) - Filter by status: `TODO`, `IN_PROGRESS`, or `DONE`
- `sortBy` (optional) - Sort field (default: `createdAt`)
- `order` (optional) - Sort order: `asc` or `desc` (default: `desc`)

**Examples:**

```
GET /api/tasks
GET /api/tasks?status=TODO
GET /api/tasks?status=IN_PROGRESS&sortBy=title&order=asc
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "6530f3a2b8c9d4e5f6a7b8c9",
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation",
      "status": "TODO",
      "startDate": "2024-10-18T10:00:00.000Z",
      "endDate": "2024-10-20T18:00:00.000Z",
      "createdAt": "2024-10-18T08:30:00.000Z",
      "updatedAt": "2024-10-18T08:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 3. Get Single Task

Retrieve a specific task by ID.

**Endpoint:** `GET /api/tasks/:id`

**Example:**

```
GET /api/tasks/6530f3a2b8c9d4e5f6a7b8c9
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": "6530f3a2b8c9d4e5f6a7b8c9",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "TODO",
    "startDate": "2024-10-18T10:00:00.000Z",
    "endDate": "2024-10-20T18:00:00.000Z",
    "createdAt": "2024-10-18T08:30:00.000Z",
    "updatedAt": "2024-10-18T08:30:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Invalid task ID format"
}
```

---

### 4. Update Task

Update an existing task.

**Endpoint:** `PUT /api/tasks/:id`

**Request Body:**
All fields are optional. Only include fields you want to update.

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "startDate": "2024-10-18T10:00:00Z",
  "endDate": "2024-10-22T18:00:00Z"
}
```

**Example:**

```
PUT /api/tasks/6530f3a2b8c9d4e5f6a7b8c9
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "6530f3a2b8c9d4e5f6a7b8c9",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "IN_PROGRESS",
    "startDate": "2024-10-18T10:00:00.000Z",
    "endDate": "2024-10-22T18:00:00.000Z",
    "createdAt": "2024-10-18T08:30:00.000Z",
    "updatedAt": "2024-10-18T09:15:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

### 5. Delete Task

Delete a task by ID.

**Endpoint:** `DELETE /api/tasks/:id`

**Example:**

```
DELETE /api/tasks/6530f3a2b8c9d4e5f6a7b8c9
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "6530f3a2b8c9d4e5f6a7b8c9",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "TODO",
    "startDate": "2024-10-18T10:00:00.000Z",
    "endDate": "2024-10-20T18:00:00.000Z",
    "createdAt": "2024-10-18T08:30:00.000Z",
    "updatedAt": "2024-10-18T08:30:00.000Z"
  }
}
```

**Error Response (404):**

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## Error Responses

All endpoints may return the following error responses:

**500 Internal Server Error:**

```json
{
  "success": false,
  "message": "Failed to [operation]",
  "error": "Error details"
}
```

**404 Not Found (Invalid Route):**

```json
{
  "success": false,
  "message": "Route /api/invalid not found"
}
```

---

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure MongoDB:**

   - Update `.env` file with your MongoDB Atlas connection string
   - Ensure database name is included in the connection string

3. **Generate Prisma Client:**

   ```bash
   npm run generate
   ```

4. **Push database schema:**

   ```bash
   npx prisma db push
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

---

## Testing with cURL

### Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first task",
    "description": "This is a test task",
    "status": "TODO"
  }'
```

### Get all tasks:

```bash
curl http://localhost:3000/api/tasks
```

### Get a specific task:

```bash
curl http://localhost:3000/api/tasks/{task-id}
```

### Update a task:

```bash
curl -X PUT http://localhost:3000/api/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS"
  }'
```

### Delete a task:

```bash
curl -X DELETE http://localhost:3000/api/tasks/{task-id}
```

---

## Technologies Used

- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Prisma** - ORM
- **TypeScript** - Type safety

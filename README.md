# Todo Backend API

A RESTful API for managing tasks built with Express.js, MongoDB Atlas, Prisma, and TypeScript.

## Features

- ✅ Create tasks with title, description, start date, and end date
- ✅ View all tasks with filtering and sorting
- ✅ View individual task details
- ✅ Update task information
- ✅ Delete tasks
- ✅ Task status management (TODO, IN_PROGRESS, DONE)
- ✅ Input validation and error handling
- ✅ MongoDB Atlas integration
- ✅ TypeScript for type safety

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   cd TodoBE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/tododb?retryWrites=true&w=majority"
   PORT=3000
   ```

   **Important:** Make sure to include the database name (`/tododb`) in your connection string between the host and query parameters.

4. **Set up MongoDB Atlas**

   - Go to https://cloud.mongodb.com/
   - Navigate to **Network Access** → **Add IP Address**
   - Add your current IP or use `0.0.0.0/0` for development
   - Verify your database user credentials in **Database Access**

5. **Generate Prisma Client**

   ```bash
   npm run generate
   ```

6. **Push database schema to MongoDB**
   ```bash
   npx prisma db push
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| GET    | `/`              | API information and documentation       |
| POST   | `/api/tasks`     | Create a new task                       |
| GET    | `/api/tasks`     | Get all tasks (with optional filtering) |
| GET    | `/api/tasks/:id` | Get a specific task                     |
| PUT    | `/api/tasks/:id` | Update a task                           |
| DELETE | `/api/tasks/:id` | Delete a task                           |

### Task Status Values

- `TODO` - Task not started (default)
- `IN_PROGRESS` - Task in progress
- `DONE` - Task completed

## API Usage Examples

### Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "TODO",
    "startDate": "2024-10-18T10:00:00Z",
    "endDate": "2024-10-20T18:00:00Z"
  }'
```

### Get All Tasks

```bash
# Get all tasks
curl http://localhost:3000/api/tasks

# Filter by status
curl http://localhost:3000/api/tasks?status=TODO

# Sort by title in ascending order
curl http://localhost:3000/api/tasks?sortBy=title&order=asc
```

### Get a Single Task

```bash
curl http://localhost:3000/api/tasks/{task-id}
```

### Update a Task

```bash
curl -X PUT http://localhost:3000/api/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS",
    "description": "Updated description"
  }'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/{task-id}
```

## Project Structure

```
TodoBE/
├── src/
│   ├── config/
│   │   └── prisma.ts          # Prisma client configuration
│   ├── routes/
│   │   └── task.routes.ts     # Task CRUD routes
│   └── middleware/
│       └── errorHandler.ts    # Error handling middleware
├── prisma/
│   └── schema.prisma          # Database schema
├── generated/
│   └── prisma/                # Generated Prisma client
├── index.ts                   # Main application entry point
├── .env                       # Environment variables
└── package.json               # Project dependencies
```

## Database Schema

```prisma
enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

model Task {
  id          String      @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  status      TaskStatus  @default(TODO)
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development mode)"
}
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Prisma** - Modern ORM for Node.js
- **TypeScript** - Type safety and better developer experience
- **dotenv** - Environment variable management

## Troubleshooting

### MongoDB Connection Issues

1. **P1013 Error (Database must be defined)**

   - Ensure your connection string includes the database name: `...mongodb.net/tododb?...`

2. **Server Selection Timeout**

   - Check if your IP is whitelisted in MongoDB Atlas Network Access
   - Verify your database credentials are correct
   - Ensure your internet connection is stable

3. **Authentication Failed**
   - Double-check username and password in `.env`
   - Verify the user has proper permissions in Database Access

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio (database GUI)

## API Documentation

For detailed API documentation with request/response examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## License

ISC

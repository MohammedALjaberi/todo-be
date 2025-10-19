# Quick Start Guide

## Step 1: Fix MongoDB Connection (If Not Already Done)

Make sure your `.env` file has the correct connection string with the database name:

```env
DATABASE_URL="mongodb+srv://mohdhadi:736544605@todocluster.mvwjhoc.mongodb.net/tododb?retryWrites=true&w=majority&appName=TodoCluster"
```

## Step 2: Whitelist Your IP in MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Click on **Network Access** (left sidebar under Security)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (adds 0.0.0.0/0)
5. Click **Confirm**
6. Wait 1-2 minutes for changes to take effect

## Step 3: Push Database Schema

```bash
npx prisma db push
```

You should see:

```
✅ Your database is now in sync with your Prisma schema.
```

## Step 4: Start the Server

```bash
npm run dev
```

You should see:

```
✅ Server is running at http://localhost:3000
📝 API Documentation: http://localhost:3000
```

## Step 5: Test the API

### Option A: Using cURL

**Create a task:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Task",
    "description": "Testing the API",
    "status": "TODO"
  }'
```

**Get all tasks:**

```bash
curl http://localhost:3000/api/tasks
```

### Option B: Using a REST Client (Postman, Insomnia, Thunder Client)

**1. Create a Task**

- Method: `POST`
- URL: `http://localhost:3000/api/tasks`
- Headers: `Content-Type: application/json`
- Body (JSON):

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs",
  "status": "TODO",
  "startDate": "2024-10-18T10:00:00Z",
  "endDate": "2024-10-20T18:00:00Z"
}
```

**2. Get All Tasks**

- Method: `GET`
- URL: `http://localhost:3000/api/tasks`

**3. Get Tasks by Status**

- Method: `GET`
- URL: `http://localhost:3000/api/tasks?status=TODO`

**4. Update a Task**

- Method: `PUT`
- URL: `http://localhost:3000/api/tasks/{task-id}`
- Headers: `Content-Type: application/json`
- Body (JSON):

```json
{
  "status": "IN_PROGRESS",
  "description": "Updated description"
}
```

**5. Delete a Task**

- Method: `DELETE`
- URL: `http://localhost:3000/api/tasks/{task-id}`

## Expected Response Format

### Success Response:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "6530f3a2b8c9d4e5f6a7b8c9",
    "title": "My First Task",
    "description": "Testing the API",
    "status": "TODO",
    "startDate": null,
    "endDate": null,
    "createdAt": "2024-10-18T08:30:00.000Z",
    "updatedAt": "2024-10-18T08:30:00.000Z"
  }
}
```

### Error Response:

```json
{
  "success": false,
  "message": "Title is required"
}
```

## Common Issues

### Issue: "Server selection timeout"

**Solution:** Whitelist your IP in MongoDB Atlas Network Access

### Issue: "Database must be defined in the connection string"

**Solution:** Add `/tododb` to your connection string before the `?` character

### Issue: "Cannot find module './generated/prisma'"

**Solution:** Run `npm run generate` to generate Prisma Client

## Next Steps

- Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation
- Read [README.md](./README.md) for project overview and setup
- Use `npx prisma studio` to view your database in a GUI

## Task Status Values

Remember, the valid status values are:

- `TODO` - Default status for new tasks
- `IN_PROGRESS` - Task is being worked on
- `DONE` - Task is completed

## Tips

1. **Only title is required** when creating a task
2. **All fields are optional** when updating a task
3. **Dates should be in ISO 8601 format** (e.g., "2024-10-18T10:00:00Z")
4. **Task IDs are MongoDB ObjectIds** (24 character hex strings)
5. **Use query parameters** for filtering and sorting (e.g., `?status=TODO&sortBy=title&order=asc`)

Happy coding! 🚀

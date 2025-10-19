# Postman Testing Guide

## Setup

### 1. Import the Collection

1. Open Postman
2. Click **Import** (top left)
3. Select **Todo_API.postman_collection.json** from your project folder
4. Click **Import**

### 2. Start Your Server

```bash
npm run dev
```

Make sure you see:

```
✅ Server is running at http://localhost:3000
```

## Testing Workflow

### Step 1: Create a Task

1. Open **Tasks → Create Task**
2. Click **Send**
3. You should get a **201 Created** response with the task data
4. **Copy the `id` from the response** (e.g., `"6530f3a2b8c9d4e5f6a7b8c9"`)

### Step 2: Set the Task ID Variable

1. Go to the **Variables** tab at the collection level
2. Paste the copied ID into the `taskId` **Current Value** field
3. Click **Save**

Now all requests using `{{taskId}}` will use this ID!

### Step 3: Test All Endpoints

Run these requests in order:

1. ✅ **Create Task** - Creates a new task
2. ✅ **Get All Tasks** - See all tasks
3. ✅ **Get Single Task by ID** - Get the specific task
4. ✅ **Update Task** - Change status to IN_PROGRESS
5. ✅ **Get Tasks by Status (IN_PROGRESS)** - Verify it appears
6. ✅ **Update Task to DONE** - Mark as complete
7. ✅ **Delete Task** - Remove the task

### Step 4: Test Validation

Try the **Validation Tests** folder to see Zod validation in action:

1. **Missing Title** - Should return 400 error
2. **Invalid Status** - Should return 400 error
3. **End Date Before Start Date** - Should return 400 error
4. **Invalid ID Format** - Should return 400 error

## Expected Responses

### Success Response (201/200):

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "6530f3a2b8c9d4e5f6a7b8c9",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "TODO",
    "startDate": "2024-10-19T10:00:00.000Z",
    "endDate": "2024-10-21T18:00:00.000Z",
    "createdAt": "2024-10-19T08:30:00.000Z",
    "updatedAt": "2024-10-19T08:30:00.000Z"
  }
}
```

### Validation Error (400):

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "title",
      "message": "Title is required and cannot be empty"
    }
  ]
}
```

### Not Found (404):

```json
{
  "success": false,
  "message": "Task not found"
}
```

## Query Parameters

### Filter by Status

```
GET http://localhost:3000/api/tasks?status=TODO
GET http://localhost:3000/api/tasks?status=IN_PROGRESS
GET http://localhost:3000/api/tasks?status=DONE
```

### Sort Tasks

```
GET http://localhost:3000/api/tasks?sortBy=title&order=asc
GET http://localhost:3000/api/tasks?sortBy=createdAt&order=desc
```

### Combine Filters

```
GET http://localhost:3000/api/tasks?status=TODO&sortBy=title&order=asc
```

## Tips

1. **Use Variables**: Set `{{taskId}}` variable to avoid manually copying IDs
2. **Check Status Codes**:
   - 200 = Success
   - 201 = Created
   - 400 = Validation Error
   - 404 = Not Found
   - 500 = Server Error
3. **Save Responses**: Use Postman's "Save Response" to compare results
4. **Use Environments**: Create dev/prod environments for different servers

## Troubleshooting

### 500 Internal Server Error

- Check if MongoDB Atlas IP is whitelisted
- Verify `.env` has `retryWrites=false`
- Check server logs in terminal

### Connection Refused

- Make sure server is running (`npm run dev`)
- Check port 3000 is not in use

### Validation Errors

- Check request body format (must be valid JSON)
- Verify field names match exactly (case-sensitive)
- Use ISO 8601 format for dates

## Task Status Values

Valid status values:

- `TODO` - Task not started (default)
- `IN_PROGRESS` - Task in progress
- `DONE` - Task completed

## Date Format

Use ISO 8601 format for dates:

```
"2024-10-19T10:00:00Z"
```

Happy Testing! 🚀

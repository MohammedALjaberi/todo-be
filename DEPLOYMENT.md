# Deployment Guide

## Your Deployed Backend

**Backend URL:** https://todo-be-1-9b93.onrender.com

## Testing Your Deployed API

### 1. Test the Root Endpoint

```bash
curl https://todo-be-1-9b93.onrender.com/
```

### 2. Create a Task

```bash
curl -X POST https://todo-be-1-9b93.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task from deployed API",
    "description": "Testing production deployment",
    "status": "TODO"
  }'
```

### 3. Get All Tasks

```bash
curl https://todo-be-1-9b93.onrender.com/api/tasks
```

## Frontend Integration

Update your frontend to use the deployed backend URL:

### Option 1: Environment Variables (Recommended)

Create a `.env` file in your frontend:

```env
VITE_API_URL=https://todo-be-1-9b93.onrender.com
```

Then in your code:

```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Fetch tasks
const response = await fetch(`${API_URL}/api/tasks`);
```

### Option 2: Direct URL

```javascript
const API_URL = "https://todo-be-1-9b93.onrender.com";

// Create task
const response = await fetch(`${API_URL}/api/tasks`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "My task",
    description: "Task description",
    status: "TODO",
  }),
});
```

## Update CORS for Your Frontend

Once you deploy your frontend, update the `allowedOrigins` in `index.ts`:

```typescript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-frontend-domain.vercel.app", // Your deployed frontend
  "https://your-frontend-domain.netlify.app",
];
```

Then commit and push to trigger a new deployment on Render.

## Environment Variables on Render

Make sure these environment variables are set in your Render dashboard:

1. Go to your service on Render
2. Click on "Environment"
3. Add these variables:
   - `DATABASE_URL` - Your MongoDB connection string
   - `NODE_ENV` - `production`
   - `PORT` - `3000` (optional, Render sets this automatically)

## API Endpoints

All endpoints are now available at:

```
https://todo-be-1-9b93.onrender.com/api/tasks
```

- **POST** `/api/tasks` - Create task
- **GET** `/api/tasks` - Get all tasks
- **GET** `/api/tasks?search=term` - Search tasks
- **GET** `/api/tasks/:id` - Get single task
- **PUT** `/api/tasks/:id` - Update task
- **DELETE** `/api/tasks/:id` - Delete task

## Monitoring

- **Render Dashboard:** https://dashboard.render.com/
- **Logs:** Check your service logs in Render dashboard
- **Health Check:** Visit https://todo-be-1-9b93.onrender.com/ to verify it's running

## Common Issues

### 1. CORS Errors

- Add your frontend domain to `allowedOrigins` in `index.ts`
- Commit and push to redeploy

### 2. Database Connection Issues

- Verify `DATABASE_URL` is set correctly in Render environment variables
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0` or Render's IPs

### 3. Cold Starts

- Render free tier may spin down after inactivity
- First request after inactivity may be slow (30-60 seconds)
- Consider upgrading to paid tier for always-on service

## Updating Your Deployment

1. Make changes to your code
2. Commit changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. Render will automatically deploy the new version

## Next Steps

1. ✅ Backend deployed on Render
2. 🔄 Deploy your frontend (Vercel, Netlify, etc.)
3. 🔧 Update CORS with your frontend URL
4. 🔒 Secure your API (add authentication if needed)
5. 📊 Set up monitoring and logging

Happy deploying! 🚀

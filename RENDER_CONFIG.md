# Render Configuration Guide

## Fix Your Render Deployment

### Step 1: Update Build & Start Commands

Go to your Render dashboard and update these settings:

1. **Go to:** https://dashboard.render.com/
2. **Select your service:** `todo-be-1-9b93`
3. **Click:** Settings
4. **Update these fields:**

   **Build Command:**

   ```
   npm install && npm run build
   ```

   **Start Command:**

   ```
   npm start
   ```

5. **Click:** Save Changes

### Step 2: Verify Environment Variables

Make sure these are set in Environment tab:

- `DATABASE_URL` - Your MongoDB connection string (should already be set)
- `NODE_ENV` - `production` (optional)

### Step 3: Manual Deploy

After saving the settings:

1. Click **Manual Deploy** → **Deploy latest commit**
2. Watch the logs
3. Wait for "Deploy succeeded" message

## Expected Deployment Logs

You should see:

```
==> Running build command 'npm install && npm run build'
==> Generating Prisma Client
✔ Generated Prisma Client

==> Running 'npm start'
✅ Server is running at http://localhost:3000
```

## Test Your Deployment

Once deployed, test:

```bash
curl https://todo-be-1-9b93.onrender.com/
```

Should return:

```json
{
  "success": true,
  "message": "Todo API is running",
  "version": "1.0.0"
}
```

## Troubleshooting

### If Prisma Client is still not found:

Add a `postinstall` script to package.json:

```json
"scripts": {
  "postinstall": "prisma generate",
  "build": "prisma generate",
  "start": "ts-node index.ts"
}
```

### If port binding fails:

Make sure your app listens on `process.env.PORT`:

```typescript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

This is already configured in your `index.ts` ✅

## Alternative: Use render.yaml

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: todo-be
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
```

Then commit and push - Render will auto-detect and use this config.

Happy deploying! 🚀

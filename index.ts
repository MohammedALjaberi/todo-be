import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./src/routes/task.routes";
import { errorHandler, notFoundHandler } from "./src/middleware/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/tasks", taskRoutes);

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
  console.log(`📝 API Documentation: http://localhost:${port}`);
});

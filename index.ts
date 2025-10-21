import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./src/routes/task.routes";
import { errorHandler, notFoundHandler } from "./src/middleware/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Configure CORS to allow your frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "https://todo-app-lilac-theta.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo API is running",
    version: "1.0.0",
    endpoints: {
      tasks: {
        create: "POST /api/tasks",
        getAll: "GET /api/tasks",
        search: "GET /api/tasks?search=term",
        getOne: "GET /api/tasks/:id",
        update: "PUT /api/tasks/:id",
        delete: "DELETE /api/tasks/:id",
      },
    },
  });
});

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

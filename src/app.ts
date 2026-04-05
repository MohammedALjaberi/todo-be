import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: allowedOrigins || true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
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

app.use("/api/tasks", taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

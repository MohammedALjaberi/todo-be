import { z } from "zod";

// Task status enum
export const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

// MongoDB ObjectId validation
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid task ID format");

// Create task schema
export const createTaskSchema = z
  .object({
    title: z.string().min(1, "Title is required and cannot be empty").trim(),
    description: z.string().trim().optional().nullable(),
    status: TaskStatusEnum.optional().default("TODO"),
    startDate: z.coerce.date().optional().nullable(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

// Update task schema (all fields optional)
export const updateTaskSchema = z
  .object({
    title: z.string().min(1, "Title cannot be empty").trim().optional(),
    description: z.string().trim().optional().nullable(),
    status: TaskStatusEnum.optional(),
    startDate: z.coerce.date().optional().nullable(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

// Query parameters schema for getting tasks
export const getTasksQuerySchema = z.object({
  status: TaskStatusEnum.optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(["title", "status", "createdAt", "updatedAt", "startDate", "endDate"])
    .optional()
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

// Types
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>;
export type TaskStatus = z.infer<typeof TaskStatusEnum>;

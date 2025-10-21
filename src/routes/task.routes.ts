import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/prisma";
import { validate } from "../middleware/validate";
import {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
  objectIdSchema,
} from "../schemas/task.schema";

const router = Router();

// Create a new task
router.post(
  "/",
  validate({ body: createTaskSchema }),
  async (req: Request, res: Response) => {
    try {
      const { title, description, status, startDate, endDate } = req.body;

      const task = await prisma.task.create({
        data: {
          title,
          description: description || null,
          status,
          ...(startDate && { startDate: new Date(startDate) }),
          ...(endDate && { endDate: new Date(endDate) }),
        },
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error: any) {
      console.error("Error creating task:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create task",
        error: error.message,
      });
    }
  }
);

// Get all tasks
router.get(
  "/",
  validate({ query: getTasksQuerySchema }),
  async (req: Request, res: Response) => {
    try {
      const { status, search, sortBy, order } = req.query as any;

      // Build filter object
      const where: any = {};

      // Filter by status
      if (status) {
        where.status = status;
      }

      // Search in title
      if (search) {
        where.OR = [{ title: { contains: search, mode: "insensitive" } }];
      }

      // Build sort object
      const orderBy: any = {};
      orderBy[sortBy] = order;

      const tasks = await prisma.task.findMany({
        where,
        orderBy,
      });

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        data: tasks,
        count: tasks.length,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
        error: error.message,
      });
    }
  }
);

// Get a single task by ID
router.get(
  "/:id",
  validate({ params: z.object({ id: objectIdSchema }) }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const task = await prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Task retrieved successfully",
        data: task,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch task",
        error: error.message,
      });
    }
  }
);

// Update a task
router.put(
  "/:id",
  validate({
    params: z.object({ id: objectIdSchema }),
    body: updateTaskSchema,
  }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, status, startDate, endDate } = req.body;

      // Check if task exists
      const existingTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      // Build update data object
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined)
        updateData.description = description || null;
      if (status !== undefined) updateData.status = status;
      if (startDate !== undefined && startDate !== null)
        updateData.startDate = new Date(startDate);
      if (endDate !== undefined && endDate !== null)
        updateData.endDate = new Date(endDate);

      const updatedTask = await prisma.task.update({
        where: { id },
        data: updateData,
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to update task",
        error: error.message,
      });
    }
  }
);

// Delete a task
router.delete(
  "/:id",
  validate({ params: z.object({ id: objectIdSchema }) }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Check if task exists
      const existingTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      await prisma.task.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: existingTask,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete task",
        error: error.message,
      });
    }
  }
);

export default router;

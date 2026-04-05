import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/prisma";
import { validate } from "../middleware/validate";
import {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
  objectIdSchema,
  type GetTasksQuery,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "../schemas/task.schema";
import { Prisma } from "../../generated/prisma";

const router = Router();

router.post(
  "/",
  validate({ body: createTaskSchema }),
  async (req: Request, res: Response) => {
    try {
      const { title, description, status, startDate, endDate } =
        req.body as CreateTaskInput;

      const task = await prisma.task.create({
        data: {
          title,
          description: description ?? null,
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
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create task",
      });
    }
  }
);

router.get(
  "/",
  validate({ query: getTasksQuerySchema }),
  async (req: Request, res: Response) => {
    try {
      const { status, search, sortBy, order } = req.query as unknown as GetTasksQuery;

      const where: Prisma.TaskWhereInput = {};

      if (status) {
        where.status = status;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ];
      }

      const orderBy: Prisma.TaskOrderByWithRelationInput = {
        [sortBy]: order,
      };

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
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
      });
    }
  }
);

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
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch task",
      });
    }
  }
);

router.put(
  "/:id",
  validate({
    params: z.object({ id: objectIdSchema }),
    body: updateTaskSchema,
  }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, status, startDate, endDate } =
        req.body as UpdateTaskInput;

      const existingTask = await prisma.task.findUnique({
        where: { id },
      });

      if (!existingTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      const updateData: Prisma.TaskUpdateInput = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description ?? null;
      if (status !== undefined) updateData.status = status;
      if (startDate !== undefined)
        updateData.startDate = startDate ? new Date(startDate) : null;
      if (endDate !== undefined)
        updateData.endDate = endDate ? new Date(endDate) : null;

      const updatedTask = await prisma.task.update({
        where: { id },
        data: updateData,
      });

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update task",
      });
    }
  }
);

router.delete(
  "/:id",
  validate({ params: z.object({ id: objectIdSchema }) }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

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
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete task",
      });
    }
  }
);

export default router;

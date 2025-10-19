import { Request, Response, NextFunction } from "express";
import { z } from "zod";

/**
 * Middleware to validate request data using Zod schemas
 */
export const validate = (schema: {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body if schema provided
      if (schema.body) {
        const validatedBody = await schema.body.parseAsync(req.body);
        req.body = validatedBody;
      }

      // Validate query if schema provided
      if (schema.query) {
        req.query = (await schema.query.parseAsync(req.query)) as any;
      }

      // Validate params if schema provided
      if (schema.params) {
        req.params = (await schema.params.parseAsync(req.params)) as any;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      // Handle other errors
      next(error);
    }
  };
};

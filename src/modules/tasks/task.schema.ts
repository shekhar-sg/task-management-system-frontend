import { z } from "zod";

const priorityEnum = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
const statusEnum = ["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"] as const;

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(priorityEnum),
  assignedToId: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters").optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(priorityEnum).optional(),
  status: z.enum(statusEnum).optional(),
  assignedToId: z.string().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

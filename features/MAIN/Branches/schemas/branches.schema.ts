import { z } from 'zod';

export const branchSchema = z.object({
  name: z.string().min(1, 'Branch name is required').max(255, 'Branch name must be less than 255 characters'),
  code: z.string().min(1, 'Branch code is required').max(50, 'Branch code must be less than 50 characters'),
  address: z.string().optional(),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  is_active: z.boolean().optional(),
});

export type BranchFormData = z.infer<typeof branchSchema>;

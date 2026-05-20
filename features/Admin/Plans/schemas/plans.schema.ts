import { z } from 'zod';

export const planSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be 0 or greater'),
  billing_cycle: z.string().min(1, 'Billing cycle is required'),
  max_users: z.number().min(1, 'Max users must be at least 1'),
  max_branches: z.number().min(1, 'Max branches must be at least 1'),
  features: z.array(z.string()).optional(),
  is_active: z.boolean(),
  is_popular: z.boolean(),
  sort_order: z.number(),
});

export type PlanFormData = z.infer<typeof planSchema>;

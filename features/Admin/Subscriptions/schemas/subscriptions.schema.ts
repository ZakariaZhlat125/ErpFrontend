import { z } from 'zod';

export const subscriptionSchema = z.object({
  user_id: z.string().min(1, 'User is required'),
  plan_id: z.string().min(1, 'Plan is required'),
  billing_cycle: z.string().min(1, 'Billing cycle is required'),
  auto_renew: z.boolean(),
  payment_method: z.string().optional(),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  status: z.enum(['active', 'pending', 'cancelled', 'expired']),
  price_paid: z.coerce.number().min(0, 'Price must be 0 or greater'),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

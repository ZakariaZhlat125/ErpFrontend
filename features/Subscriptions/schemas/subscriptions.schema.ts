import { z } from 'zod';

export const subscriptionSchema = z.object({
  plan_id: z.string().min(1, 'Plan is required'),
  billing_cycle: z.string().min(1, 'Billing cycle is required'),
  auto_renew: z.boolean(),
  payment_method: z.string().optional(),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

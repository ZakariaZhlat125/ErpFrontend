import { z } from 'zod';

export const partySchema = z.object({
  code: z.string().min(1, 'Party code is required').max(50, 'Party code must be less than 50 characters'),
  type: z.enum(['individual', 'company']),
  display_name: z.string().min(1, 'Display name is required').max(255, 'Display name must be less than 255 characters'),
  legal_name: z.string().max(255, 'Legal name must be less than 255 characters').optional(),
  tax_number: z.string().max(50, 'Tax number must be less than 50 characters').optional(),
  currency_id: z.number().nullable().optional(),
  notes: z.string().optional(),
  is_active: z.boolean().optional(),
  roles: z.array(z.enum(['customer', 'supplier', 'agent', 'contractor'])).optional(),
});

export type PartyFormData = z.infer<typeof partySchema>;

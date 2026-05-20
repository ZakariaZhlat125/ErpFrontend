import { z } from 'zod';

export const organizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  legal_name: z.string().min(1, 'Legal name is required'),
  tax_number: z.string().min(1, 'Tax number is required'),
  base_currency_id: z.coerce.number().min(1, 'Base currency is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  locale: z.string().min(1, 'Locale is required'),
  status: z.enum(['active', 'inactive', 'pending']),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;

import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  password_confirmation: z.string().optional(),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive', 'pending']),
  organization_id: z.string().optional(),
  branch_id: z.string().optional(),
}).refine((data) => {
  // Only validate password match if password is provided
  if (data.password && data.password_confirmation) {
    return data.password === data.password_confirmation;
  }
  return true;
}, {
  message: 'Passwords do not match',
  path: ['password_confirmation'],
});

export type UserFormData = z.infer<typeof userSchema>;

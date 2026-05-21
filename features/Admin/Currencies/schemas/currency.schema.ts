import { z } from 'zod';

export const currencySchema = z.object({
  code: z.string().min(3, 'Currency code must be 3 letters').max(3, 'Currency code must be 3 letters'),
  name: z.string().min(1, 'Currency name is required'),
  symbol: z.string().min(1, 'Currency symbol is required'),
  decimal_separator: z.string().optional(),
  thousands_separator: z.string().optional(),
  decimal_places: z.number().min(0).max(4).optional(),
  exchange_rate: z.number().positive('Exchange rate must be greater than 0'),
  is_active: z.boolean().optional(),
});

export const updateExchangeRateSchema = z.object({
  exchange_rate: z.number().positive('Exchange rate must be greater than 0'),
});

export type CurrencyFormData = z.infer<typeof currencySchema>;
export type UpdateExchangeRateFormData = z.infer<typeof updateExchangeRateSchema>;

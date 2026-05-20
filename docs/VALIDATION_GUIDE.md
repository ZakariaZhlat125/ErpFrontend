# Validation System Guide

## Overview

This ERP application uses a centralized, dynamic validation system built on **Zod** with full **internationalization (i18n)** support via **next-intl**. All validation messages automatically adapt to the user's selected language (English/Arabic).

## Architecture

### Components

1. **Zod Error Map** (`src/lib/validation/zodErrorMap.ts`)
   - Translates Zod validation errors to user-friendly messages
   - Integrates with next-intl translation system
   - Handles all Zod error types (invalid_type, too_small, too_big, etc.)

2. **Validation Schemas** (`src/lib/validation/schemas.ts`)
   - Reusable validation functions for common field types
   - Type-safe with full TypeScript support
   - Composable for complex validation scenarios

3. **Validation Hook** (`src/lib/validation/useValidation.ts`)
   - Client-side hook that provides locale-aware validation
   - Automatically sets up Zod error map
   - Exports all validation schemas and utilities

4. **Translation Files**
   - `src/locales/en/validation.json` - English validation messages
   - `src/locales/ar/validation.json` - Arabic validation messages

## Quick Start

### Basic Form Validation

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useValidation } from '@/lib/validation';
import { useTranslations } from 'next-intl';

export function MyForm() {
  const { z, emailSchema, passwordSchema } = useValidation();
  const t = useTranslations('myFeature');

  // Define schema
  const schema = z.object({
    email: emailSchema(),
    password: passwordSchema(8),
  });

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder={t('emailPlaceholder')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Available Validation Schemas

### Email Validation

```typescript
const { emailSchema } = useValidation();

// Required email
const schema = z.object({
  email: emailSchema(),
});

// Optional email
const schema = z.object({
  email: emailSchema({ required: false }),
});
```

### Password Validation

```typescript
const { passwordSchema, strongPasswordSchema } = useValidation();

// Basic password (min 8 characters by default)
const schema = z.object({
  password: passwordSchema(),
});

// Custom minimum length
const schema = z.object({
  password: passwordSchema(12), // min 12 characters
});

// Strong password (requires uppercase, lowercase, number, special char)
const schema = z.object({
  password: strongPasswordSchema(10),
});
```

### Password Confirmation

```typescript
const { z, passwordSchema } = useValidation();

const schema = z.object({
  password: passwordSchema(8),
  confirmPassword: passwordSchema(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.match.password',
  path: ['confirmPassword'],
});
```

### Name Validation

```typescript
const { nameSchema } = useValidation();

// Default: min 2, max 100 characters
const schema = z.object({
  name: nameSchema(),
});

// Custom length
const schema = z.object({
  name: nameSchema(3, 50), // min 3, max 50
});
```

### Phone Number Validation

```typescript
const { phoneSchema } = useValidation();

const schema = z.object({
  phone: phoneSchema(),
});
```

### URL Validation

```typescript
const { urlSchema } = useValidation();

// Required URL
const schema = z.object({
  website: urlSchema(),
});

// Optional URL
const schema = z.object({
  website: urlSchema({ required: false }),
});
```

### Number Validation

```typescript
const { numberSchema } = useValidation();

// Basic number
const schema = z.object({
  age: numberSchema(),
});

// Number with constraints
const schema = z.object({
  age: numberSchema({ min: 18, max: 120 }),
});
```

### Date Validation

```typescript
const { dateSchema } = useValidation();

const schema = z.object({
  birthDate: dateSchema(),
});
```

## Custom Validation Messages

All validation messages support interpolation for dynamic values:

```json
{
  "validation": {
    "string": {
      "tooShort": "Must be at least {minimum} characters"
    }
  }
}
```

The `{minimum}` placeholder is automatically replaced with the actual minimum value.

## Adding Custom Validators

### Creating a New Schema Function

Add to `src/lib/validation/schemas.ts`:

```typescript
export function customFieldSchema(minValue: number) {
  return z.number().min(minValue).refine((val) => {
    // Custom validation logic
    return val % 2 === 0;
  }, {
    message: 'validation.custom.mustBeEven',
  });
}
```

### Adding Translation Keys

Update `src/locales/en/validation.json` and `src/locales/ar/validation.json`:

```json
{
  "validation": {
    "custom": {
      "mustBeEven": "Value must be an even number"
    }
  }
}
```

## Complex Validation Scenarios

### Conditional Validation

```typescript
const { z, emailSchema, passwordSchema } = useValidation();

const schema = z.object({
  userType: z.enum(['individual', 'company']),
  email: emailSchema(),
  companyName: z.string().optional(),
}).refine((data) => {
  if (data.userType === 'company') {
    return data.companyName && data.companyName.length > 0;
  }
  return true;
}, {
  message: 'validation.companyNameRequired',
  path: ['companyName'],
});
```

### Cross-Field Validation

```typescript
const { z, dateSchema } = useValidation();

const schema = z.object({
  startDate: dateSchema(),
  endDate: dateSchema(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'validation.endDateMustBeAfterStartDate',
  path: ['endDate'],
});
```

### Array Validation

```typescript
const { z, emailSchema } = useValidation();

const schema = z.object({
  emails: z.array(emailSchema()).min(1).max(5),
});
```

## Best Practices

### 1. Use Semantic Schema Functions

✅ **Good:**
```typescript
const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(8),
});
```

❌ **Bad:**
```typescript
const schema = z.object({
  email: z.string().email('Email غير صحيح'), // Hardcoded message
  password: z.string().min(8, 'كلمة المرور...'), // Mixed language
});
```

### 2. Keep Translations Organized

- Field labels go in feature translation files (e.g., `auth.json`)
- Validation messages stay in `validation.json`

### 3. Type Safety

Always infer types from schemas:

```typescript
const schema = z.object({
  email: emailSchema(),
});

type FormValues = z.infer<typeof schema>;
```

### 4. Validation Mode

For better UX, validate on blur:

```typescript
useForm<FormValues>({
  resolver: zodResolver(schema),
  mode: 'onBlur', // Validates when user leaves field
});
```

### 5. Error Display

Always show validation errors to users:

```typescript
<Input
  {...register('email')}
  error={!!errors.email}
  errorText={errors.email?.message}
/>
```

## Server-Side Validation

For server-side validation (API routes, server actions), use the same schemas:

```typescript
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/lib/validation';

// In API route or server action
export async function POST(request: Request) {
  const body = await request.json();
  
  const schema = z.object({
    email: emailSchema(),
    password: passwordSchema(8),
  });

  try {
    const validated = schema.parse(body);
    // Process validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.errors }, { status: 400 });
    }
  }
}
```

## Troubleshooting

### Validation Messages Not Translating

1. Ensure `useValidation()` hook is called in your component
2. Check that translation keys exist in both `en` and `ar` files
3. Verify `useTranslations()` is imported from 'next-intl'

### Type Errors with z.infer

Use the `z` from the validation hook:

```typescript
const { z } = useValidation();
type FormValues = z.infer<typeof schema>;
```

### Custom Messages Not Working

Ensure custom messages use translation keys:

```typescript
// ✅ Correct
.refine(validator, { message: 'validation.custom.myKey' })

// ❌ Wrong - hardcoded
.refine(validator, { message: 'Hardcoded error message' })
```

## Migration Guide

### Converting Existing Forms

**Before:**
```typescript
const schema = z.object({
  email: z.string().email('Email غير صحيح'),
  password: z.string().min(8, 'كلمة المرور لازم 8 أحرف'),
});
```

**After:**
```typescript
const { z, emailSchema, passwordSchema } = useValidation();

const schema = z.object({
  email: emailSchema(),
  password: passwordSchema(8),
});
```

## Examples

See the following files for complete examples:

- `features/Auth/LoginForm.tsx`
- `features/Auth/RegisterForm.tsx`
- `features/Auth/ForgetPasswordForm.tsx`
- `features/Auth/ResetPasswordForm.tsx`

## Future Enhancements

- [ ] Add more specialized validators (credit card, phone formats, etc.)
- [ ] Create validation schema generator utility
- [ ] Add validation analytics/monitoring
- [ ] Generate schema documentation automatically
- [ ] Add validation testing utilities

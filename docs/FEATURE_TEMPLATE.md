# Feature Template - Best Practice Architecture

This document provides a comprehensive template and prompt for creating new features following the best practice architecture established in the MyEstablishment feature.

## Architecture Pattern

Every feature should follow this structure:

```
features/[FeatureName]/
├── types/
│   └── [feature].types.ts        # TypeScript interfaces
├── constants/
│   └── [feature].constants.ts    # Query keys, defaults, enums
├── services/
│   └── [feature].service.ts      # API service layer
├── hooks/
│   ├── [feature].ts              # Data fetching hooks (React Query)
│   ├── use[Feature].ts           # Feature-specific business logic hook
│   └── use[Feature]Form.ts       # Form logic hook (if forms exist)
├── utils/
│   └── [feature].utils.ts        # Pure utility functions, transformers
├── components/
│   ├── [Feature].tsx             # Main UI component (presentation only)
│   ├── CreateForm/
│   │   └── Create[Feature].tsx  # Create form (presentation only)
│   ├── EditForm/
│   │   └── Edit[Feature].tsx    # Edit form (presentation only)
│   └── Skeletons/
│       └── [Feature]Skeleton.tsx # Loading states
├── __tests__/
│   ├── [feature].service.test.ts
│   ├── [feature].hooks.test.ts
│   └── [Feature].test.tsx
└── locales/                      # Translation files (if needed)
    ├── en.json
    └── ar.json
```

## Separation of Concerns

### 1. Types Layer (`types/`)
- Define all TypeScript interfaces
- No logic, only type definitions
- Export: Entity types, Input types, Filter types, Response types
- **Be explicit** - avoid `Partial<>` for Update types, list all updatable fields

### 2. Constants Layer (`constants/`)
- Query keys for React Query
- Default form values
- Enums and constant values
- Configuration objects
- **Centralized** - easier to maintain and update

### 3. Service Layer (`services/`)
- All API calls
- Uses the centralized apiClient
- Returns typed responses
- No React dependencies
- **Error handling** - let errors bubble up to hooks
- **Type safety** - strict typing for requests and responses

### 4. Data Hooks (`hooks/[feature].ts`)
- React Query hooks for data fetching
- Mutation hooks for CRUD operations
- Cache invalidation logic
- Reusable across components
- **Optimistic updates** for better UX
- **Error handling** with proper error types

### 5. Business Logic Hooks (`hooks/use[Feature].ts`)
- Feature-specific state management
- Event handlers (onClick, onSubmit, etc.)
- Modal state management
- Navigation logic
- Returns clean interface for UI components
- **Memoization** - use useCallback for handlers
- **No side effects** in render

### 6. Form Logic Hooks (`hooks/use[Feature]Form.ts`)
- Form validation schema (Zod)
- Form state management (react-hook-form)
- Submit logic
- Error/success message handling
- Reusable for both create and edit modes
- **Server-side validation** error mapping
- **Field-level errors** handling

### 7. Utils Layer (`utils/`)
- Pure utility functions
- Data transformers
- Formatters (date, currency, etc.)
- Validators
- **No side effects** - pure functions only
- **Testable** - easy to unit test

### 8. UI Components (`components/`)
- **Pure presentation layer**
- No business logic
- No API calls
- Only renders UI using data and handlers from hooks
- Uses the business logic hooks
- **Accessibility** - ARIA labels, keyboard navigation
- **Loading states** - skeleton components
- **Error boundaries** - graceful error handling

---

## Prompt for Creating New Features

Copy and paste this prompt when creating a new feature:

```
Create a new feature following the best practice architecture established in the MyEstablishment feature.

Feature Requirements:
- Feature Name: [FEATURE_NAME]
- Entity: [ENTITY_NAME] (e.g., Product, User, Invoice)
- Required Fields: [LIST_FIELDS]
- CRUD Operations: [CREATE/READ/UPDATE/DELETE] (specify which)
- Additional Requirements: [ANY_SPECIAL_REQUIREMENTS]

Follow this architecture:

1. TYPES LAYER (types/[feature].types.ts)
   - Create [Entity] interface with all fields (including optional created_at, updated_at)
   - Create Create[Entity]Input interface (required fields only)
   - Create Update[Entity]Input interface (explicitly list updatable fields, avoid Partial<>)
   - Create [Entity]Filters interface (if filtering needed)
   - Create API response types (PaginatedResponse, ApiResponse)
   - Use strict TypeScript - no 'any' types

2. CONSTANTS LAYER (constants/[feature].constants.ts)
   - Export QUERY_KEY constant for React Query
   - Export default form values
   - Export enums (status values, etc.)
   - Export configuration objects (pagination defaults, etc.)
   - Keep all magic strings and numbers here

3. SERVICE LAYER (services/[feature].service.ts)
   - Create [feature]Api object with methods:
     * getAll(filters?) - Fetch all entities with optional filtering
     * getById(id) - Fetch single entity
     * create(data) - Create new entity
     * update(id, data) - Full update
     * delete(id) - Delete entity
     * patch(id, data) - Partial update (optional)
   - Use apiClient from '@/lib/api/client'
   - Return typed responses (use types from step 1)
   - Handle query parameters properly
   - No error handling here - let errors bubble up

4. DATA HOOKS (hooks/[feature].ts)
   - Import QUERY_KEY from constants
   - Create use[Entity] hook for fetching single entity:
     * Use useQuery with proper queryKey
     * Set staleTime (e.g., 5 minutes)
     * Enable/disable based on id presence
   - Create use[Entities] hook for fetching list:
     * Support filters parameter
     * Include filters in queryKey
   - Create useCreate[Entity] mutation hook:
     * Use useMutation
     * Invalidate queries on success
     * Consider optimistic updates
   - Create useUpdate[Entity] mutation hook:
     * Invalidate both list and detail queries
   - Create useDelete[Entity] mutation hook:
     * Invalidate queries on success
   - Export all hooks and QUERY_KEY

5. BUSINESS LOGIC HOOK (hooks/use[Feature].ts)
   - Create use[Feature] hook that:
     * Uses data hooks from step 4
     * Manages local state (modals, selected items, delete confirmation)
     * Provides memoized event handlers (useCallback):
       - handleCreate, handleEdit, handleDelete
       - handleOpenModal, handleCloseModal
       - handleNavigation
     * Returns clean interface:
       - Data (entities, isLoading, error)
       - State (isModalOpen, selectedItem)
       - Handlers (onClick, onSubmit, etc.)
       - Mutation states (isCreating, isUpdating, isDeleting)
   - No UI code, only logic
   - Use useCallback for all handlers to prevent re-renders

6. FORM LOGIC HOOK (hooks/use[Feature]Form.ts) - if forms needed
   - Import default values from constants
   - Create Zod schema for validation:
     * Required fields
     * Email, URL validation
     * Custom validators
     * Error messages
   - Export form values type (z.infer<typeof schema>)
   - Create use[Feature]Form hook with:
     * mode parameter ('create' | 'edit')
     * entity parameter (for edit mode)
     * onSuccess callback
     * Form state using react-hook-form with zodResolver
     * useEffect to populate form in edit mode
     * handleSubmit function:
       - Different logic for create vs edit
       - Error/success message handling
       - Call onSuccess after delay
     * handleReset function
     * Return: form, error, success, isPending, handleSubmit, handleReset

7. UTILS LAYER (utils/[feature].utils.ts) - if needed
   - Create pure utility functions:
     * Data transformers (API to UI format)
     * Formatters (dates, currency, phone numbers)
     * Validators (custom validation logic)
     * Calculators (totals, percentages)
   - All functions must be pure (no side effects)
   - Export individual functions
   - Easy to unit test

8. UI COMPONENTS (components/)
   - Main [Feature].tsx component:
     * Use use[Feature] hook for all logic
     * Pure presentation - no business logic
     * Render UI using data and handlers from hook
     * Handle loading state (show skeleton)
     * Handle error state (show error message)
     * Handle empty state (show empty message)
     * Use proper ARIA labels
     * Support keyboard navigation
   
   - Skeleton component (components/Skeletons/[Feature]Skeleton.tsx):
     * Match the layout of main component
     * Use skeleton UI library or custom
   
   - Create form component (if needed):
     * Use use[Feature]Form hook with mode='create'
     * Pure presentation
     * No API calls or business logic
     * Proper form accessibility
   
   - Edit form component (if needed):
     * Reuse use[Feature]Form hook with mode='edit'
     * Pass entity prop
     * Pure presentation

9. TESTING LAYER (__tests__/)
   - Service tests ([feature].service.test.ts):
     * Mock apiClient
     * Test all CRUD operations
     * Test error handling
   
   - Hook tests ([feature].hooks.test.ts):
     * Use @testing-library/react-hooks
     * Test data hooks
     * Test mutations and cache invalidation
   
   - Component tests ([Feature].test.tsx):
     * Use @testing-library/react
     * Test rendering
     * Test user interactions
     * Test loading/error states

10. LOCALIZATION (locales/) - if needed
    - Create en.json with all translation keys
    - Create ar.json with Arabic translations
    - Use consistent key naming (feature.section.key)
    - Include: titles, labels, buttons, messages, errors

11. ACCESSIBILITY CHECKLIST
    - [ ] All interactive elements have ARIA labels
    - [ ] Keyboard navigation works (Tab, Enter, Escape)
    - [ ] Focus management in modals
    - [ ] Screen reader announcements for dynamic content
    - [ ] Color contrast meets WCAG standards
    - [ ] Form validation errors are announced

12. PERFORMANCE CHECKLIST
    - [ ] Use useCallback for event handlers
    - [ ] Use useMemo for expensive calculations
    - [ ] Implement proper React Query staleTime
    - [ ] Use optimistic updates where appropriate
    - [ ] Lazy load heavy components
    - [ ] Debounce search inputs
    - [ ] Virtual scrolling for large lists (if needed)

13. SECURITY CHECKLIST
    - [ ] Input sanitization (XSS prevention)
    - [ ] Validate data on client and server
    - [ ] No sensitive data in URLs
    - [ ] Proper error messages (no stack traces to user)
    - [ ] CSRF protection (handled by apiClient)

14. CODE QUALITY
    - [ ] All code inside features/[FEATURE_NAME]/ folder
    - [ ] Follow existing code style and patterns
    - [ ] Use TypeScript strictly - no 'any' types
    - [ ] Add JSDoc comments for complex functions
    - [ ] Handle loading, error, and empty states
    - [ ] Consistent naming conventions
    - [ ] No console.log in production code
```

---

## Example: MyEstablishment Feature Structure

Reference the MyEstablishment feature as a complete example:

**Types Layer:**
- `features/MyEstablishment/types/organization.types.ts` - Entity, Input, Filter types

**Service Layer:**
- `features/MyEstablishment/services/organization.service.ts` - API calls

**Data Hooks:**
- `features/MyEstablishment/hooks/useOrganizations.ts` - React Query hooks

**Business Logic:**
- `features/MyEstablishment/hooks/useMyEstablishment.ts` - Feature logic

**Form Logic:**
- `features/MyEstablishment/hooks/useOrganizationForm.ts` - Form handling

**UI Components:**
- `features/MyEstablishment/MyEstablishment.tsx` - Main component
- `features/MyEstablishment/components/CreateForm/CreateOrganizationForm.tsx` - Create form
- `features/MyEstablishment/components/EditForm/EditOrganizationForm.tsx` - Edit form

---

## Key Principles

1. **Separation of Concerns**: Logic in hooks, UI in components, data in services
2. **Reusability**: Hooks can be reused across components and features
3. **Testability**: Pure functions and hooks are easier to test in isolation
4. **Type Safety**: Strict TypeScript throughout - no 'any' types allowed
5. **Single Responsibility**: Each file has one clear purpose and does it well
6. **No Logic in UI**: Components should only render - zero business logic
7. **Centralized API**: All API calls go through service layer
8. **Cache Management**: React Query handles data caching and invalidation
9. **Form Validation**: Zod for schema validation with clear error messages
10. **Error Handling**: Consistent error handling patterns across features
11. **Performance First**: Memoization, lazy loading, optimistic updates
12. **Accessibility**: WCAG 2.1 AA compliance minimum
13. **Security**: Input sanitization, validation, no sensitive data exposure
14. **Internationalization**: Support multiple languages from day one
15. **Progressive Enhancement**: Works without JavaScript where possible
16. **Mobile First**: Responsive design, touch-friendly interfaces
17. **DRY Principle**: Don't repeat yourself - extract reusable logic
18. **SOLID Principles**: Apply SOLID to React components and hooks
19. **Documentation**: Code should be self-documenting with clear naming
20. **Continuous Improvement**: Refactor as you learn better patterns

---

## Comprehensive Checklist for New Features

### Architecture
- [ ] Types defined in `types/` folder with explicit interfaces
- [ ] Constants defined in `constants/` folder
- [ ] Service layer created in `services/` folder
- [ ] Data hooks created in `hooks/[feature].ts`
- [ ] Business logic hook created in `hooks/use[Feature].ts`
- [ ] Form logic hook created (if forms needed)
- [ ] Utils created in `utils/` folder (if needed)
- [ ] All code inside `features/[FEATURE_NAME]/` folder

### Components
- [ ] Main UI component uses business logic hook
- [ ] Form components use form logic hook
- [ ] Skeleton/loading components created
- [ ] No API calls in components
- [ ] No business logic in components
- [ ] Components are pure presentation layer

### Type Safety
- [ ] TypeScript strict mode compliant
- [ ] No 'any' types used
- [ ] All props properly typed
- [ ] All API responses typed
- [ ] Update types are explicit (not Partial<>)

### State Management
- [ ] React Query for server state
- [ ] Local state in business logic hooks
- [ ] Cache invalidation in mutations
- [ ] Optimistic updates where appropriate
- [ ] Proper staleTime configuration

### UI States
- [ ] Loading states handled (skeleton UI)
- [ ] Error states handled (error messages)
- [ ] Empty states handled (empty state UI)
- [ ] Success states handled (success messages)
- [ ] Pending states handled (disabled buttons)

### Forms (if applicable)
- [ ] Zod schema for validation
- [ ] Field-level error messages
- [ ] Form-level error messages
- [ ] Server-side validation error mapping
- [ ] Form reset functionality
- [ ] Supports both create and edit modes
- [ ] Loading state during submission

### Performance
- [ ] useCallback for event handlers
- [ ] useMemo for expensive calculations
- [ ] Lazy loading for heavy components
- [ ] Debouncing for search inputs
- [ ] Virtual scrolling for large lists (if needed)
- [ ] Code splitting where appropriate
- [ ] Image optimization

### Accessibility
- [ ] All interactive elements have ARIA labels
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus management in modals
- [ ] Screen reader tested
- [ ] Color contrast meets WCAG AA
- [ ] Form validation errors are announced
- [ ] Skip links for navigation
- [ ] Semantic HTML used

### Security
- [ ] Input sanitization implemented
- [ ] XSS prevention measures
- [ ] No sensitive data in URLs
- [ ] No sensitive data in console.log
- [ ] Proper error messages (no stack traces)
- [ ] CSRF protection (via apiClient)
- [ ] Data validation on client and server

### Internationalization
- [ ] Translation files created (en.json, ar.json)
- [ ] All user-facing text uses translations
- [ ] Consistent translation key naming
- [ ] Pluralization handled correctly
- [ ] Date/time formatting localized
- [ ] Number formatting localized

### Testing
- [ ] Service layer tests written
- [ ] Hook tests written
- [ ] Component tests written
- [ ] Edge cases covered
- [ ] Error scenarios tested
- [ ] Loading states tested
- [ ] All tests passing

### Code Quality
- [ ] Follows existing code style
- [ ] Consistent naming conventions
- [ ] No console.log in production code
- [ ] No commented-out code
- [ ] JSDoc comments for complex functions
- [ ] Code is self-documenting
- [ ] No magic numbers or strings (use constants)
- [ ] DRY principle followed

### Documentation
- [ ] README created (if complex feature)
- [ ] API contracts documented
- [ ] Complex logic explained
- [ ] Usage examples provided

### Final Review
- [ ] Feature works in all supported browsers
- [ ] Feature works on mobile devices
- [ ] Feature works with screen readers
- [ ] No console errors or warnings
- [ ] Performance is acceptable
- [ ] Code reviewed by peer
- [ ] Tested by QA (if applicable)

---

## Common Pitfalls to Avoid

### 1. **Putting Business Logic in Components**
❌ **Bad:**
```tsx
function MyFeature() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  
  const handleDelete = (id) => {
    fetch(`/api/data/UTF8{id}`, { method: 'DELETE' });
  };
  
  return <div>...</div>;
}
```

✅ **Good:**
```tsx
function MyFeature() {
  const { data, isLoading, handleDelete } = useMyFeature();
  return <div>...</div>;
}
```

### 2. **Using 'any' Type**
❌ **Bad:**
```typescript
const handleSubmit = (data: any) => { ... }
```

✅ **Good:**
```typescript
const handleSubmit = (data: CreateOrganizationInput) => { ... }
```

### 3. **Not Memoizing Event Handlers**
❌ **Bad:**
```tsx
function useMyFeature() {
  return {
    handleClick: () => { ... }, // New function on every render
  };
}
```

✅ **Good:**
```tsx
function useMyFeature() {
  const handleClick = useCallback(() => { ... }, []);
  return { handleClick };
}
```

### 4. **Hardcoding Query Keys**
❌ **Bad:**
```typescript
useQuery({ queryKey: ['organizations'], ... });
```

✅ **Good:**
```typescript
// In constants file
export const QUERY_KEY = 'organizations';

// In hook
useQuery({ queryKey: [QUERY_KEY], ... });
```

### 5. **Not Handling Loading/Error States**
❌ **Bad:**
```tsx
function MyFeature() {
  const { data } = useMyData();
  return <div>{data.map(...)}</div>; // Crashes if data is undefined
}
```

✅ **Good:**
```tsx
function MyFeature() {
  const { data, isLoading, error } = useMyData();
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage />;
  if (!data?.length) return <EmptyState />;
  
  return <div>{data.map(...)}</div>;
}
```

### 6. **Using Partial<> for Update Types**
❌ **Bad:**
```typescript
export interface UpdateOrganizationInput extends Partial<CreateOrganizationInput> {}
```

✅ **Good:**
```typescript
export interface UpdateOrganizationInput {
  name?: string;
  legal_name?: string;
  tax_number?: string;
  // ... explicitly list all updatable fields
}
```

### 7. **Not Invalidating Cache After Mutations**
❌ **Bad:**
```typescript
useMutation({
  mutationFn: (data) => api.create(data),
  // No onSuccess - cache not updated!
});
```

✅ **Good:**
```typescript
useMutation({
  mutationFn: (data) => api.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  },
});
```

### 8. **Mixing Concerns in Hooks**
❌ **Bad:**
```typescript
function useMyFeature() {
  // Data fetching + business logic + form logic all mixed
  const { data } = useQuery(...);
  const form = useForm(...);
  const [modalOpen, setModalOpen] = useState(false);
  // ... everything in one hook
}
```

✅ **Good:**
```typescript
// Separate hooks for different concerns
function useMyData() { ... }        // Data fetching only
function useMyFeature() { ... }     // Business logic only
function useMyForm() { ... }        // Form logic only
```

---

## Performance Optimization Tips

### 1. **Use Optimistic Updates**
```typescript
const updateMutation = useMutation({
  mutationFn: (data) => api.update(id, data),
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: [QUERY_KEY, id] });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData([QUERY_KEY, id]);
    
    // Optimistically update
    queryClient.setQueryData([QUERY_KEY, id], newData);
    
    return { previous };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData([QUERY_KEY, id], context.previous);
  },
});
```

### 2. **Debounce Search Inputs**
```typescript
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';

function useMyFeature() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);
  
  const { data } = useMyData({ search: debouncedSearch });
  
  return { search, setSearch, data };
}
```

### 3. **Lazy Load Heavy Components**
```typescript
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function MyFeature() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### 4. **Virtual Scrolling for Large Lists**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function MyList({ items }) {
  const parentRef = useRef();
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `UTF8{virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div key={virtualItem.key} style={{ height: `UTF8{virtualItem.size}px` }}>
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Troubleshooting Guide

### Issue: "Query not updating after mutation"
**Solution:** Ensure you're invalidating the correct query keys:
```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }); // List query
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] }); // Detail query
}
```

### Issue: "Form not resetting after submission"
**Solution:** Call reset() in the form hook:
```typescript
await createMutation.mutateAsync(data);
form.reset(); // Reset form to default values
```

### Issue: "Infinite re-renders"
**Solution:** Memoize event handlers:
```typescript
const handleClick = useCallback(() => {
  // handler logic
}, []); // Add dependencies if needed
```

### Issue: "Type errors with API responses"
**Solution:** Ensure service layer returns typed data:
```typescript
const response = await apiClient.get<ApiResponse<Product>>(`/products/UTF8{id}`);
return response.data.data; // Not just response.data
```

### Issue: "Stale data showing after update"
**Solution:** Set appropriate staleTime or use refetchOnMount:
```typescript
useQuery({
  queryKey: [QUERY_KEY],
  queryFn: () => api.getAll(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchOnMount: 'always', // Or use this
});
```

---

## Additional Resources

- **React Query Docs:** https://tanstack.com/query/latest
- **React Hook Form:** https://react-hook-form.com/
- **Zod Validation:** https://zod.dev/
- **TypeScript Best Practices:** https://www.typescriptlang.org/docs/handbook/
- **Accessibility Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **React Performance:** https://react.dev/learn/render-and-commit

---

## Version History

- **v2.0** - Added constants layer, utils layer, testing, accessibility, performance, and security guidelines
- **v1.0** - Initial template based on MyEstablishment feature

# MyEstablishment Feature

This feature implements organization management following the best practice architecture defined in `/docs/FEATURE_TEMPLATE.md`.

## Architecture Overview

```
features/MyEstablishment/
├── types/
│   └── organization.types.ts        # TypeScript interfaces
├── constants/
│   └── organization.constants.ts    # Query keys, defaults, enums
├── services/
│   └── organization.service.ts      # API service layer
├── hooks/
│   ├── useOrganizations.ts          # Data fetching hooks (React Query)
│   ├── useMyEstablishment.ts        # Feature-specific business logic
│   └── useOrganizationForm.ts       # Form logic hook
├── utils/
│   └── organization.utils.ts        # Pure utility functions
├── components/
│   ├── MyEstablishment.tsx          # Main UI component
│   ├── CreateForm/
│   │   └── CreateOrganizationForm.tsx
│   ├── EditForm/
│   │   └── EditOrganizationForm.tsx
│   └── Skeletons/
│       └── OrganizationSkeleton.tsx # Loading states
├── __tests__/
│   ├── organization.service.test.ts
│   ├── useOrganizations.test.ts
│   └── MyEstablishment.test.tsx
└── locales/
    ├── en.json
    └── ar.json
```

## Layer Responsibilities

### 1. Types Layer (`types/`)
- **Purpose**: Define all TypeScript interfaces
- **File**: `organization.types.ts`
- **Exports**:
  - `Organization` - Main entity interface
  - `CreateOrganizationInput` - Create operation input
  - `UpdateOrganizationInput` - Update operation input (explicit fields)
  - `OrganizationFilters` - Filter parameters

### 2. Constants Layer (`constants/`)
- **Purpose**: Centralize all constants and configuration
- **File**: `organization.constants.ts`
- **Exports**:
  - `QUERY_KEY` - React Query cache key
  - `DEFAULT_ORGANIZATION_VALUES` - Default form values
  - `ORGANIZATION_STATUS` - Status enum
  - `PAGINATION_DEFAULTS` - Pagination configuration
  - `STALE_TIME` - React Query stale time

### 3. Service Layer (`services/`)
- **Purpose**: Handle all API communication
- **File**: `organization.service.ts`
- **Methods**:
  - `getAll(filters?)` - Fetch all organizations
  - `getById(id)` - Fetch single organization
  - `create(data)` - Create new organization
  - `update(id, data)` - Update organization
  - `delete(id)` - Delete organization
  - `patch(id, data)` - Partial update

### 4. Data Hooks (`hooks/useOrganizations.ts`)
- **Purpose**: React Query hooks for data fetching
- **Hooks**:
  - `useOrganizations(filters?)` - Fetch list with optional filters
  - `useOrganization(id)` - Fetch single organization
  - `useCreateOrganization()` - Create mutation
  - `useUpdateOrganization()` - Update mutation
  - `useDeleteOrganization()` - Delete mutation
  - `usePatchOrganization()` - Patch mutation

### 5. Business Logic Hook (`hooks/useMyEstablishment.ts`)
- **Purpose**: Feature-specific state and event handlers
- **Features**:
  - Modal state management
  - Delete confirmation flow
  - Navigation handlers
  - **Memoized handlers** (useCallback) for performance
- **Returns**:
  - Data: `organizations`, `isLoading`, `error`
  - State: `isCreateModalOpen`, `isEditModalOpen`, `selectedOrganization`
  - Handlers: `handleSelectEstablishment`, `handleEdit`, `handleDelete`, etc.

### 6. Form Logic Hook (`hooks/useOrganizationForm.ts`)
- **Purpose**: Form state and validation
- **Features**:
  - Zod schema validation
  - Supports both create and edit modes
  - Server-side error handling
  - Success/error message management
- **Returns**:
  - `form` - react-hook-form instance
  - `error`, `success` - Message states
  - `isPending` - Loading state
  - `handleSubmit`, `handleReset` - Form actions

### 7. Utils Layer (`utils/`)
- **Purpose**: Pure utility functions
- **File**: `organization.utils.ts`
- **Functions**:
  - `formatPhoneNumber()` - Phone formatting
  - `formatStatus()` - Status display formatting
  - `getStatusColor()` - Status color mapping
  - `isValidTaxNumber()` - Tax number validation
  - `transformOrganizationFromAPI()` - Data transformation
  - `getOrganizationInitials()` - Generate initials
  - `isOrganizationActive()` - Status check
  - `sortOrganizationsByName()` - Sorting utility
  - `filterOrganizationsByStatus()` - Filtering utility

### 8. UI Components (`components/`)
- **MyEstablishment.tsx**: Main component
  - Pure presentation layer
  - Uses `useMyEstablishment` hook for all logic
  - Skeleton loading state
  - Error handling
  - **Accessibility features**:
    - ARIA labels on all interactive elements
    - Keyboard navigation (Tab, Enter, Space)
    - Escape key to close modals
    - Role attributes for semantic HTML

- **OrganizationSkeleton.tsx**: Loading state
  - Matches main component layout
  - Provides visual feedback during loading

### 9. Testing Layer (`__tests__/`)
- **organization.service.test.ts**: Service layer tests
  - Tests all CRUD operations
  - Mocks apiClient
  - Tests error handling

- **useOrganizations.test.ts**: Hook tests
  - Tests React Query hooks
  - Tests cache invalidation
  - Tests mutations

- **MyEstablishment.test.tsx**: Component tests
  - Tests rendering
  - Tests user interactions
  - Tests keyboard navigation
  - Tests loading/error states

## Best Practices Implemented

### ✅ Separation of Concerns
- Logic in hooks, UI in components
- No business logic in components
- No API calls in components

### ✅ Type Safety
- Explicit TypeScript interfaces
- No `any` types
- `UpdateOrganizationInput` explicitly lists all updatable fields (not `Partial<>`)

### ✅ Performance
- **Memoized event handlers** using `useCallback`
- React Query caching with `STALE_TIME`
- Skeleton loading for better perceived performance

### ✅ Accessibility
- ARIA labels on all buttons
- Keyboard navigation support
- Escape key to close modals
- Role attributes for semantic HTML
- Focus management

### ✅ Maintainability
- Constants centralized in one place
- Reusable utility functions
- Clear file structure
- Comprehensive tests

### ✅ Error Handling
- Loading states with skeleton
- Error states with error messages
- Empty states handled
- Server-side validation error mapping

## Usage Example

```tsx
import { MyEstablishment } from '@/features/MyEstablishment';

export default function OrganizationsPage() {
  return <MyEstablishment />;
}
```

## Testing

To run tests (requires vitest and @testing-library/react):

```bash
npm run test features/MyEstablishment
```

## Dependencies

- `@tanstack/react-query` - Data fetching and caching
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `next-intl` - Internationalization
- `@ant-design/icons` - Icons

## Future Enhancements

- [ ] Add optimistic updates for mutations
- [ ] Implement virtual scrolling for large lists
- [ ] Add export functionality
- [ ] Add bulk operations
- [ ] Add advanced filtering
- [ ] Add sorting options
- [ ] Add pagination

## Related Documentation

- [Feature Template](/docs/FEATURE_TEMPLATE.md) - Architecture guidelines
- [Validation Guide](/docs/VALIDATION_GUIDE.md) - Validation patterns

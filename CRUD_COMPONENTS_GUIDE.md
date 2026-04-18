# CRUD Components & Patterns Guide (Ant Design)

This guide explains the reusable CRUD (Create, Read, Update, Delete) components and patterns available in the application, built on top of Ant Design (antd).

## Overview

The application now includes a set of reusable components and hooks that make implementing CRUD operations across any feature page consistent and maintainable, using Ant Design as the base UI library.

## Available Components

### 1. UI Components (`src/components/ui/`)

All UI components are wrappers around Ant Design components with theme integration and consistent API.

#### Select Component
A wrapper around Ant Design Select with label, error handling, and theme support.

```tsx
import { Select } from '@/components/ui';

<Select
  label="Role"
  value={formData.role}
  onChange={(value) => setFormData({ ...formData, role: value as any })}
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ]}
  placeholder="Select role"
  required
/>
```

**Note:** Ant Design Select's `onChange` passes the value directly, not an event object.

#### Input Component
A wrapper around Ant Design Input with labels, error states, and theme support.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Full Name"
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  placeholder="Enter full name"
  required
/>
```

**Note:** Ant Design Input's `onChange` passes an event object, use `e.target.value`.

#### Modal Component
A wrapper around Ant Design Modal for forms and dialogs.

```tsx
import { Modal, Button } from '@/components/ui';

<Modal
  isOpen={isModalOpen}
  onClose={handleCancel}
  title="Edit Item"
  size="lg"
  footer={
    <>
      <Button variant="ghost" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Save
      </Button>
    </>
  }
>
  <form onSubmit={handleSubmit}>
    {/* Form fields */}
  </form>
</Modal>
```

#### Button Component
A wrapper around Ant Design Button with custom variants and theme integration.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" onClick={handleClick} isLoading={loading}>
  Save
</Button>
```

#### Card Component
A wrapper around Ant Design Card with theme integration.

```tsx
import { Card } from '@/components/ui/Card';

<Card className="p-6">
  {/* Content */}
</Card>
```

### 2. DataTable Component (`src/components/tables/DataTable.tsx`)

A flexible data table component built on Ant Design Table with built-in actions, loading states, and empty states.

```tsx
import { DataTable } from '@/components/tables/DataTable';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    render: (value: string, record: Item) => (
      <div>{value}</div>
    ),
  },
  // ... more columns
];

const actions = [
  {
    key: 'edit',
    label: 'Edit',
    icon: <EditOutlined />,
    onClick: (record: Item) => handleEdit(record),
    variant: 'ghost' as const,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <DeleteOutlined />,
    onClick: (record: Item) => handleDelete(record.id),
    variant: 'danger' as const,
  },
];

<DataTable
  data={data}
  columns={columns}
  actions={actions}
  loading={isLoading}
  emptyMessage="No items found"
/>
```

### 3. useCrud Hook (`src/lib/hooks/useCrud.ts`)

A custom hook that manages CRUD operations with built-in state management.

```tsx
import { useCrud } from '@/lib/hooks/useCrud';

interface Item {
  id: string;
  name: string;
  // ... other fields
}

const {
  data,
  isLoading,
  error,
  selectedItem,
  isModalOpen,
  isEditMode,
  handleCreate,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancel,
  closeModal,
} = useCrud<Item>({
  initialData: [],
  onCreate: async (item) => {
    // API call to create item
  },
  onUpdate: async (id, item) => {
    // API call to update item
  },
  onDelete: async (id) => {
    // API call to delete item
  },
});
```

### 4. CrudPageTemplate (`src/components/templates/CrudPageTemplate.tsx`)

A template component for consistent CRUD page layouts.

```tsx
import { CrudPageTemplate } from '@/components/templates/CrudPageTemplate';

<CrudPageTemplate
  title="Users"
  description="Manage all users"
  onAdd={handleCreate}
  addButtonText="Add User"
>
  <Card className="p-6">
    <DataTable data={data} columns={columns} actions={actions} />
  </Card>
</CrudPageTemplate>
```

## Complete Example: Creating a CRUD Page

Here's a complete example of how to implement a CRUD page using these components:

```tsx
'use client';

import { useState } from 'react';
import { Button, Input, Select, Modal } from '@/components/ui';
import { Card } from '@/components/ui/Card';
import { DataTable } from '@/components/tables/DataTable';
import { useCrud } from '@/lib/hooks/useCrud';
import { useTheme } from '@/lib/theme/use-theme';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Item {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export function ItemsPage() {
  const { tokens } = useTheme();
  const [formData, setFormData] = useState<Partial<Item>>({});

  const initialData: Item[] = [
    { id: '1', name: 'Item 1', email: 'item1@example.com', status: 'active' },
  ];

  const {
    data,
    isLoading,
    error,
    selectedItem,
    isModalOpen,
    isEditMode,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
  } = useCrud<Item>({
    initialData,
    onCreate: async (item) => {
      // API call to create
      console.log('Creating:', item);
    },
    onUpdate: async (id, item) => {
      // API call to update
      console.log('Updating:', id, item);
    },
    onDelete: async (id) => {
      // API call to delete
      console.log('Deleting:', id);
    },
  });

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (value: string) => <span>{value}</span>,
    },
  ];

  const actions = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />,
      onClick: (record: Item) => handleEdit(record),
      variant: 'ghost' as const,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      onClick: (record: Item) => handleDelete(record.id),
      variant: 'danger' as const,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: isEditMode && selectedItem ? selectedItem.id : Date.now().toString(),
      name: formData.name || '',
      email: formData.email || '',
      status: formData.status || 'active',
    };

    try {
      await handleSave(newItem);
      setFormData({});
    } catch (err) {
      console.error('Error saving:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            Items
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            Manage your items
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <PlusOutlined /> Add Item
        </Button>
      </div>

      <Card className="p-6">
        <DataTable
          data={data}
          columns={columns}
          actions={actions}
          loading={isLoading}
          emptyMessage="No items found"
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={isEditMode ? 'Edit Item' : 'Add Item'}
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} isLoading={isLoading}>
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name"
            required
          />
          <Input
            label="Email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email"
            required
          />
          <Select
            label="Status"
            value={formData.status || ''}
            onChange={(value) => setFormData({ ...formData, status: value as any })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            placeholder="Select status"
            required
          />
          {error && (
            <p className="text-sm" style={{ color: tokens.danger }}>
              {error}
            </p>
          )}
        </form>
      </Modal>
    </div>
  );
}
```

## Best Practices

1. **Always define TypeScript interfaces** for your data models
2. **Use the useCrud hook** for consistent state management
3. **Reuse the DataTable component** instead of building custom tables
4. **Use the Modal component** for create/edit forms
5. **Handle errors gracefully** with the error state from useCrud
6. **Show loading states** during async operations
7. **Remember onChange differences:**
   - Input: `onChange={(e) => setFormData({ ...formData, field: e.target.value })}`
   - Select: `onChange={(value) => setFormData({ ...formData, field: value })}`
8. **Follow the existing theme patterns** using the `useTheme` hook
9. **Leverage Ant Design's built-in features** like validation, loading states, and accessibility

## Updating Existing Pages

To update an existing page to use the CRUD pattern:

1. Define the data interface
2. Replace static data with the useCrud hook
3. Replace custom tables with the DataTable component
4. Replace custom forms with the Modal component
5. Use Input and Select components for form fields
6. Implement the onCreate, onUpdate, onDelete callbacks with API calls
7. Update onChange handlers to match Ant Design's API

## API Integration

The useCrud hook accepts async callbacks for API integration. Replace the console.log statements with actual API calls:

```tsx
onCreate: async (item) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Failed to create');
},
```

## Component Locations

- UI Components: `src/components/ui/`
- DataTable: `src/components/tables/DataTable.tsx`
- useCrud Hook: `src/lib/hooks/useCrud.ts`
- Page Template: `src/components/templates/CrudPageTemplate.tsx`

## Examples in Codebase

See these files for working examples:
- `features/Company/CompanyManagement.tsx`
- `features/MAIN/Users/Users.tsx`

## Ant Design Integration

All components are built on top of Ant Design:
- Button → Ant Design Button
- Input → Ant Design Input
- Select → Ant Design Select
- Modal → Ant Design Modal
- Card → Ant Design Card
- DataTable → Ant Design Table

This ensures:
- Consistent design language
- Built-in accessibility
- Internationalization support
- Rich component features
- Active maintenance and updates

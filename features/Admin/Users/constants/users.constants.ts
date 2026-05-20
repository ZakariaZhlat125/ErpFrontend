import { User, CreateUserInput, UserRole, UserStatus } from '../types/users.types';

export const QUERY_KEY = 'users';

export const DEFAULT_USER: CreateUserInput = {
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  role: 'user',
  status: 'active',
  organization_id: '',
  branch_id: '',
};

export const USER_ROLE_OPTIONS: { value: UserRole; label: string; color: string }[] = [
  { value: 'admin', label: 'Admin', color: '#ef4444' },
  { value: 'manager', label: 'Manager', color: '#f59e0b' },
  { value: 'user', label: 'User', color: '#0ea5e9' },
  { value: 'viewer', label: 'Viewer', color: '#6b7280' },
] as const;

export const USER_STATUS_OPTIONS: { value: UserStatus; label: string; color: string }[] = [
  { value: 'active', label: 'Active', color: '#10b981' },
  { value: 'inactive', label: 'Inactive', color: '#6b7280' },
  { value: 'suspended', label: 'Suspended', color: '#ef4444' },
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
] as const;

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-0101',
    role: 'admin',
    status: 'active',
    email_verified_at: '2024-01-10T10:00:00Z',
    last_login_at: '2024-02-15T08:30:00Z',
    organization_id: 'org1',
    organization_name: 'Acme Corp',
    created_at: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555-0102',
    role: 'manager',
    status: 'active',
    email_verified_at: '2024-01-15T10:00:00Z',
    last_login_at: '2024-02-14T14:20:00Z',
    organization_id: 'org1',
    organization_name: 'Acme Corp',
    branch_id: 'branch1',
    branch_name: 'Main Branch',
    created_at: '2024-01-05T10:00:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1 555-0103',
    role: 'user',
    status: 'inactive',
    email_verified_at: '2024-01-20T10:00:00Z',
    organization_id: 'org2',
    organization_name: 'Tech Solutions',
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '+1 555-0104',
    role: 'viewer',
    status: 'suspended',
    last_login_at: '2024-01-01T09:00:00Z',
    organization_id: 'org2',
    organization_name: 'Tech Solutions',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    phone: '+1 555-0105',
    role: 'user',
    status: 'pending',
    organization_id: 'org3',
    organization_name: 'Startup Inc',
    created_at: '2024-02-01T10:00:00Z',
  },
];

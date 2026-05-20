export interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  usersCount: number;
  permissions: Permission[];
}

export const rolesData: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    color: '#ff3b7a',
    usersCount: 5,
    permissions: [
      { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: true },
      { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: true },
      { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: true },
      { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: true },
      { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: true },
    ],
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Manage team members and view reports',
    color: '#0ea5e9',
    usersCount: 24,
    permissions: [
      { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: true },
      { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: false },
      { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: false },
      { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: true },
      { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: false },
    ],
  },
  {
    id: '3',
    name: 'User',
    description: 'Basic access to assigned resources',
    color: '#10b981',
    usersCount: 156,
    permissions: [
      { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: false },
      { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: false },
      { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: false },
      { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: false },
      { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: false },
    ],
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to system data',
    color: '#8b5cf6',
    usersCount: 87,
    permissions: [
      { id: '1', name: 'Manage Users', description: 'Create, edit, and delete users', enabled: false },
      { id: '2', name: 'Manage Roles', description: 'Create and modify user roles', enabled: false },
      { id: '3', name: 'Manage Organizations', description: 'Add and edit organizations', enabled: false },
      { id: '4', name: 'View Reports', description: 'Access all system reports', enabled: false },
      { id: '5', name: 'System Settings', description: 'Modify system configuration', enabled: false },
    ],
  },
];

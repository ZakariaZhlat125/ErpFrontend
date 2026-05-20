export type UserRole = 'admin' | 'manager' | 'user' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  email_verified_at?: string;
  last_login_at?: string;
  organization_id?: string;
  organization_name?: string;
  branch_id?: string;
  branch_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
  status: UserStatus;
  organization_id?: string;
  branch_id?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  password_confirmation?: string;
  role?: UserRole;
  status?: UserStatus;
  organization_id?: string;
  branch_id?: string;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  organization_id?: string;
  branch_id?: string;
  search?: string;
  email_verified?: boolean;
  page?: number;
  per_page?: number;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

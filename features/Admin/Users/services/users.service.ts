import apiClient from '@/lib/api/client';
import { 
  USERS_ENDPOINTS,
  USERS_QUERY_KEYS 
} from '../api/endpoints';
import { 
  User, 
  CreateUserInput, 
  UpdateUserInput, 
  UserFilters,
  PaginatedResult,
} from '../types/users.types';

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginatedResult<T>['pagination'];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const usersApi = {
  async getAll(filters?: UserFilters): Promise<PaginatedResult<User>> {
    const params = new URLSearchParams();
    const q = USERS_QUERY_KEYS;
    
    if (filters?.role) params.append(q.ROLE, filters.role);
    if (filters?.status) params.append(q.STATUS, filters.status);
    if (filters?.organization_id) params.append(q.ORGANIZATION_ID, filters.organization_id);
    if (filters?.branch_id) params.append(q.BRANCH_ID, filters.branch_id);
    if (filters?.search) params.append(q.SEARCH, filters.search);
    if (filters?.email_verified !== undefined) params.append(q.EMAIL_VERIFIED, String(filters.email_verified));
    if (filters?.page !== undefined) params.append(q.PAGE, String(filters.page));
    if (filters?.per_page !== undefined) params.append(q.PER_PAGE, String(filters.per_page));

    const url = params.toString() 
      ? `${USERS_ENDPOINTS.LIST}?${params.toString()}` 
      : USERS_ENDPOINTS.LIST;
    
    const response = await apiClient.get<PaginatedResponse<User>>(url);
    return { data: response.data.data, pagination: response.data.pagination };
  },

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(
      USERS_ENDPOINTS.DETAIL(id)
    );
    return response.data.data;
  },

  async create(data: CreateUserInput): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>(
      USERS_ENDPOINTS.CREATE, 
      data
    );
    return response.data.data;
  },

  async update(id: string, data: Partial<UpdateUserInput>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(
      USERS_ENDPOINTS.UPDATE(id), 
      data
    );
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(USERS_ENDPOINTS.DELETE(id));
  },
};

export default usersApi;

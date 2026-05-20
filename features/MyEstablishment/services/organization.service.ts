import apiClient from '@/lib/api/client';
import {
  ORGANIZATION_ENDPOINTS,
  ORGANIZATION_QUERY_KEYS 
} from '../api/endpoints';
import {
  Organization,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  OrganizationFilters,
} from '../types/organization.types';

interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const organizationApi = {
  async getAll(filters?: OrganizationFilters): Promise<Organization[]> {
    const params = new URLSearchParams();
    const q = ORGANIZATION_QUERY_KEYS;
    
    if (filters?.status) params.append(q.STATUS, filters.status);
    if (filters?.search) params.append(q.SEARCH, filters.search);

    const url = params.toString() 
      ? `${ORGANIZATION_ENDPOINTS.LIST}?${params.toString()}` 
      : ORGANIZATION_ENDPOINTS.LIST;
    
    const response = await apiClient.get<PaginatedResponse<Organization>>(url);
    return response.data.data;
  },

  async getById(id: number): Promise<Organization> {
    const response = await apiClient.get<ApiResponse<Organization>>(
      ORGANIZATION_ENDPOINTS.DETAIL(id)
    );
    return response.data.data;
  },

  async create(data: CreateOrganizationInput): Promise<Organization> {
    const response = await apiClient.post<ApiResponse<Organization>>(
      ORGANIZATION_ENDPOINTS.CREATE, 
      data
    );
    return response.data.data;
  },

  async update(id: number, data: UpdateOrganizationInput): Promise<Organization> {
    const response = await apiClient.put<ApiResponse<Organization>>(
      ORGANIZATION_ENDPOINTS.UPDATE(id), 
      data
    );
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(ORGANIZATION_ENDPOINTS.DELETE(id));
  },

  async patch(id: number, data: Partial<UpdateOrganizationInput>): Promise<Organization> {
    const response = await apiClient.patch<ApiResponse<Organization>>(
      ORGANIZATION_ENDPOINTS.PATCH(id), 
      data
    );
    return response.data.data;
  },
};

export default organizationApi;

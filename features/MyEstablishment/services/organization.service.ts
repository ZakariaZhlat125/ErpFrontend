import apiClient from '@/lib/api/client';
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
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const url = params.toString() ? `/organizations?${params.toString()}` : '/organizations';
    const response = await apiClient.get<PaginatedResponse<Organization>>(url);
    return response.data.data;
  },

  async getById(id: number): Promise<Organization> {
    const response = await apiClient.get<ApiResponse<Organization>>(`/organizations/${id}`);
    return response.data.data;
  },

  async create(data: CreateOrganizationInput): Promise<Organization> {
    const response = await apiClient.post<ApiResponse<Organization>>('/organizations', data);
    return response.data.data;
  },

  async update(id: number, data: UpdateOrganizationInput): Promise<Organization> {
    const response = await apiClient.put<ApiResponse<Organization>>(`/organizations/${id}`, data);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/organizations/${id}`);
  },

  async patch(id: number, data: Partial<UpdateOrganizationInput>): Promise<Organization> {
    const response = await apiClient.patch<ApiResponse<Organization>>(`/organizations/${id}`, data);
    return response.data.data;
  },
};

export default organizationApi;

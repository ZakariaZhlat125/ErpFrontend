import apiClient from '@/lib/api/client';
import { 
  Plan, 
  CreatePlanInput, 
  UpdatePlanInput, 
  PlanFilters,
  PaginatedResult,
} from '../types/plans.types';

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

export const plansApi = {
  async getAll(filters?: PlanFilters): Promise<PaginatedResult<Plan>> {
    const params = new URLSearchParams();
    if (filters?.is_active !== undefined) params.append('is_active', String(filters.is_active));
    if (filters?.is_popular !== undefined) params.append('is_popular', String(filters.is_popular));
    if (filters?.billing_cycle) params.append('billing_cycle', filters.billing_cycle);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page !== undefined) params.append('page', String(filters.page));
    if (filters?.per_page !== undefined) params.append('per_page', String(filters.per_page));

    const url = params.toString() ? `/admin/plans?${params.toString()}` : '/admin/plans';
    const response = await apiClient.get<PaginatedResponse<Plan>>(url);
    return { data: response.data.data, pagination: response.data.pagination };
  },

  async getById(id: string): Promise<Plan> {
    const response = await apiClient.get<ApiResponse<Plan>>(`/admin/plans/${id}`);
    return response.data.data;
  },

  async create(data: CreatePlanInput): Promise<Plan> {
    const response = await apiClient.post<ApiResponse<Plan>>('/admin/plans', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<UpdatePlanInput>): Promise<Plan> {
    const response = await apiClient.put<ApiResponse<Plan>>(`/admin/plans/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/admin/plans/${id}`);
  },

  async patch(id: string, data: Partial<UpdatePlanInput>): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(`/admin/plans/${id}`, data);
    return response.data.data;
  },

  async toggleActive(id: string, is_active: boolean): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(`/admin/plans/${id}/toggle-active`, { is_active });
    return response.data.data;
  },

  async togglePopular(id: string, is_popular: boolean): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(`/admin/plans/${id}/toggle-popular`, { is_popular });
    return response.data.data;
  },
};

export default plansApi;

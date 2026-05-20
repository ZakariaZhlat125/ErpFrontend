import apiClient from '@/lib/api/client';
import { 
  PLANS_ENDPOINTS,
  PLANS_QUERY_KEYS 
} from '../api/endpoints';
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
    const q = PLANS_QUERY_KEYS;
    
    if (filters?.is_active !== undefined) params.append(q.IS_ACTIVE, String(filters.is_active));
    if (filters?.is_popular !== undefined) params.append(q.IS_POPULAR, String(filters.is_popular));
    if (filters?.billing_cycle) params.append(q.BILLING_CYCLE, filters.billing_cycle);
    if (filters?.search) params.append(q.SEARCH, filters.search);
    if (filters?.page !== undefined) params.append(q.PAGE, String(filters.page));
    if (filters?.per_page !== undefined) params.append(q.PER_PAGE, String(filters.per_page));

    const url = params.toString() 
      ? `${PLANS_ENDPOINTS.LIST}?${params.toString()}` 
      : PLANS_ENDPOINTS.LIST;
    
    const response = await apiClient.get<PaginatedResponse<Plan>>(url);
    return { data: response.data.data, pagination: response.data.pagination };
  },

  async getById(id: string): Promise<Plan> {
    const response = await apiClient.get<ApiResponse<Plan>>(
      PLANS_ENDPOINTS.DETAIL(id)
    );
    return response.data.data;
  },

  async create(data: CreatePlanInput): Promise<Plan> {
    const response = await apiClient.post<ApiResponse<Plan>>(
      PLANS_ENDPOINTS.CREATE, 
      data
    );
    return response.data.data;
  },

  async update(id: string, data: Partial<UpdatePlanInput>): Promise<Plan> {
    const response = await apiClient.put<ApiResponse<Plan>>(
      PLANS_ENDPOINTS.UPDATE(id), 
      data
    );
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(PLANS_ENDPOINTS.DELETE(id));
  },

  async patch(id: string, data: Partial<UpdatePlanInput>): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(
      PLANS_ENDPOINTS.PATCH(id), 
      data
    );
    return response.data.data;
  },

  async toggleActive(id: string, is_active: boolean): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(
      PLANS_ENDPOINTS.TOGGLE_ACTIVE(id), 
      { is_active }
    );
    return response.data.data;
  },

  async togglePopular(id: string, is_popular: boolean): Promise<Plan> {
    const response = await apiClient.patch<ApiResponse<Plan>>(
      PLANS_ENDPOINTS.TOGGLE_POPULAR(id), 
      { is_popular }
    );
    return response.data.data;
  },
};

export default plansApi;

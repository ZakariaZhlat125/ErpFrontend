import apiClient from '@/lib/api/client';
import { 
  SUBSCRIPTIONS_ENDPOINTS,
  SUBSCRIPTIONS_QUERY_KEYS 
} from '../api/endpoints';
import { 
  Subscription, 
  CreateSubscriptionInput, 
  UpdateSubscriptionInput, 
  SubscribeUserInput,
  ChangeStatusInput,
  RenewSubscriptionInput,
  CancelSubscriptionInput,
  SubscriptionFilters,
  PaginatedResult,
} from '../types/subscriptions.types';

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

export const subscriptionsApi = {
  async getAll(filters?: SubscriptionFilters): Promise<PaginatedResult<Subscription>> {
    const params = new URLSearchParams();
    const q = SUBSCRIPTIONS_QUERY_KEYS;
    
    if (filters?.status) params.append(q.STATUS, filters.status);
    if (filters?.billing_cycle) params.append(q.BILLING_CYCLE, filters.billing_cycle);
    if (filters?.plan_id) params.append(q.PLAN_ID, filters.plan_id);
    if (filters?.user_id) params.append(q.USER_ID, filters.user_id);
    if (filters?.search) params.append(q.SEARCH, filters.search);
    if (filters?.start_date_from) params.append(q.START_DATE_FROM, filters.start_date_from);
    if (filters?.start_date_to) params.append(q.START_DATE_TO, filters.start_date_to);
    if (filters?.end_date_from) params.append(q.END_DATE_FROM, filters.end_date_from);
    if (filters?.end_date_to) params.append(q.END_DATE_TO, filters.end_date_to);
    if (filters?.page !== undefined) params.append(q.PAGE, String(filters.page));
    if (filters?.per_page !== undefined) params.append(q.PER_PAGE, String(filters.per_page));

    const url = params.toString() 
      ? `${SUBSCRIPTIONS_ENDPOINTS.LIST}?${params.toString()}` 
      : SUBSCRIPTIONS_ENDPOINTS.LIST;
    
    const response = await apiClient.get<PaginatedResponse<Subscription>>(url);
    return { data: response.data.data, pagination: response.data.pagination };
  },

  async getById(id: string): Promise<Subscription> {
    const response = await apiClient.get<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.DETAIL(id)
    );
    return response.data.data;
  },

  async create(data: CreateSubscriptionInput): Promise<Subscription> {
    const response = await apiClient.post<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.CREATE, 
      data
    );
    return response.data.data;
  },

  async update(id: string, data: Partial<UpdateSubscriptionInput>): Promise<Subscription> {
    const response = await apiClient.put<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.UPDATE(id), 
      data
    );
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(SUBSCRIPTIONS_ENDPOINTS.DELETE(id));
  },

  async subscribeUser(data: SubscribeUserInput): Promise<Subscription> {
    const response = await apiClient.post<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.SUBSCRIBE_USER, 
      data
    );
    return response.data.data;
  },

  async changeStatus(id: string, data: ChangeStatusInput): Promise<Subscription> {
    const response = await apiClient.patch<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.CHANGE_STATUS(id), 
      data
    );
    return response.data.data;
  },

  async renewSubscription(id: string, data?: RenewSubscriptionInput): Promise<Subscription> {
    const response = await apiClient.post<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.RENEW(id), 
      data || {}
    );
    return response.data.data;
  },

  async cancelSubscription(id: string, data?: CancelSubscriptionInput): Promise<Subscription> {
    const response = await apiClient.post<ApiResponse<Subscription>>(
      SUBSCRIPTIONS_ENDPOINTS.CANCEL(id), 
      data || {}
    );
    return response.data.data;
  },
};

export default subscriptionsApi;

import apiClient from '@/lib/api/client';
import { 
  CURRENCY_ENDPOINTS,
  CURRENCY_QUERY_KEYS 
} from '../api/endpoints';
import { 
  Currency, 
  CreateCurrencyInput, 
  UpdateCurrencyInput, 
  CurrencyFilters,
  PaginatedResult,
  CurrencyConvertRequest,
  CurrencyConvertResponse,
  UpdateExchangeRateRequest,
} from '../types/currency.types';

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginatedResult<T>['pagination'];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const currencyApi = {
  async getAll(filters?: CurrencyFilters): Promise<PaginatedResult<Currency>> {
    const params = new URLSearchParams();
    const q = CURRENCY_QUERY_KEYS;
    
    if (filters?.search) params.append(q.SEARCH, filters.search);
    if (filters?.is_active !== undefined) params.append(q.IS_ACTIVE, String(filters.is_active));
    if (filters?.is_base !== undefined) params.append(q.IS_BASE, String(filters.is_base));
    if (filters?.page !== undefined) params.append(q.PAGE, String(filters.page));
    if (filters?.per_page !== undefined) params.append(q.PER_PAGE, String(filters.per_page));

    const url = params.toString() 
      ? `${CURRENCY_ENDPOINTS.LIST}?${params.toString()}` 
      : CURRENCY_ENDPOINTS.LIST;
    
    const response = await apiClient.get<PaginatedResponse<Currency>>(url);
    return { data: response.data.data, pagination: response.data.meta };
  },

  async getById(id: number): Promise<Currency> {
    const response = await apiClient.get<ApiResponse<Currency>>(
      CURRENCY_ENDPOINTS.DETAIL(id)
    );
    return response.data.data;
  },

  async create(data: CreateCurrencyInput): Promise<Currency> {
    const response = await apiClient.post<ApiResponse<Currency>>(
      CURRENCY_ENDPOINTS.CREATE, 
      data
    );
    return response.data.data;
  },

  async update(id: number, data: Partial<UpdateCurrencyInput>): Promise<Currency> {
    const response = await apiClient.put<ApiResponse<Currency>>(
      CURRENCY_ENDPOINTS.UPDATE(id), 
      data
    );
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(CURRENCY_ENDPOINTS.DELETE(id));
  },

  async setAsBase(id: number): Promise<void> {
    await apiClient.post(CURRENCY_ENDPOINTS.SET_BASE(id));
  },

  async updateExchangeRate(id: number, data: UpdateExchangeRateRequest): Promise<void> {
    await apiClient.post(CURRENCY_ENDPOINTS.UPDATE_RATE(id), data);
  },

  async toggleActive(id: number): Promise<void> {
    await apiClient.post(CURRENCY_ENDPOINTS.TOGGLE_ACTIVE(id));
  },

  // Public endpoints (for organization users)
  async getPublicCurrencies(): Promise<Currency[]> {
    const response = await apiClient.get<ApiResponse<Currency[]>>(CURRENCY_ENDPOINTS.PUBLIC_LIST);
    return response.data.data;
  },

  async getBaseCurrency(): Promise<Currency> {
    const response = await apiClient.get<ApiResponse<Currency>>(CURRENCY_ENDPOINTS.PUBLIC_BASE);
    return response.data.data;
  },

  async convert(data: CurrencyConvertRequest): Promise<CurrencyConvertResponse> {
    const response = await apiClient.post<ApiResponse<CurrencyConvertResponse>>(
      CURRENCY_ENDPOINTS.CONVERT, 
      data
    );
    return response.data.data;
  },
};

export default currencyApi;

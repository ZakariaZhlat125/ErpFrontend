export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  decimal_separator: string;
  thousands_separator: string;
  decimal_places: number;
  exchange_rate: number;
  is_base: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCurrencyInput {
  code: string;
  name: string;
  symbol: string;
  decimal_separator?: string;
  thousands_separator?: string;
  decimal_places?: number;
  exchange_rate: number;
  is_active?: boolean;
}

export interface UpdateCurrencyInput {
  code?: string;
  name?: string;
  symbol?: string;
  decimal_separator?: string;
  thousands_separator?: string;
  decimal_places?: number;
  exchange_rate?: number;
  is_active?: boolean;
}

export interface CurrencyFilters {
  search?: string;
  is_active?: boolean;
  is_base?: boolean;
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

export interface CurrencyConvertRequest {
  from_currency_id: number;
  to_currency_id: number;
  amount: number;
}

export interface CurrencyConvertResponse {
  original_amount: number;
  converted_amount: number;
  from_currency_id: number;
  to_currency_id: number;
}

export interface UpdateExchangeRateRequest {
  exchange_rate: number;
}

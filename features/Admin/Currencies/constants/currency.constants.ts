import { Currency, CreateCurrencyInput } from '../types/currency.types';

export const QUERY_KEY = 'currencies';

export const DEFAULT_CURRENCY: CreateCurrencyInput = {
  code: '',
  name: '',
  symbol: '',
  decimal_separator: '.',
  thousands_separator: ',',
  decimal_places: 2,
  exchange_rate: 1,
  is_active: true,
};

export const COMMON_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
];

export const DECIMAL_SEPARATOR_OPTIONS = [
  { value: '.', label: 'Period (.)' },
  { value: ',', label: 'Comma (,)' },
];

export const THOUSANDS_SEPARATOR_OPTIONS = [
  { value: ',', label: 'Comma (,)' },
  { value: '.', label: 'Period (.)' },
  { value: ' ', label: 'Space ( )' },
];

export const DECIMAL_PLACES_OPTIONS = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

export const STATUS_OPTIONS: { value: boolean; label: string; color: string }[] = [
  { value: true, label: 'Active', color: '#10b981' },
  { value: false, label: 'Inactive', color: '#6b7280' },
];

export const MOCK_CURRENCIES: Currency[] = [
  {
    id: 1,
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    decimal_separator: '.',
    thousands_separator: ',',
    decimal_places: 2,
    exchange_rate: 1,
    is_base: true,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    decimal_separator: '.',
    thousands_separator: ',',
    decimal_places: 2,
    exchange_rate: 0.85,
    is_base: false,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 3,
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    decimal_separator: '.',
    thousands_separator: ',',
    decimal_places: 2,
    exchange_rate: 0.73,
    is_base: false,
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 4,
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: '﷼',
    decimal_separator: '.',
    thousands_separator: ',',
    decimal_places: 2,
    exchange_rate: 3.75,
    is_base: false,
    is_active: true,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  {
    id: 5,
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    decimal_separator: '.',
    thousands_separator: ',',
    decimal_places: 0,
    exchange_rate: 150.25,
    is_base: false,
    is_active: false,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
];

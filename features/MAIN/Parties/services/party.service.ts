import { apiClient } from '@/lib/api/client';
import {
  PARTY_ENDPOINTS,
  PARTY_QUERY_KEYS 
} from '../api/endpoints';
import type {
  Party,
  CreatePartyInput,
  UpdatePartyInput,
  PartyFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types/party.types';

/**
 * Party API service
 * All API calls for party management
 */
export const partyApi = {
  /**
   * Get all parties for an organization
   */
  async getAll(organizationId: number, filters?: PartyFilters): Promise<Party[]> {
    const response = await apiClient.get<ApiResponse<Party[]>>(
      PARTY_ENDPOINTS.LIST(organizationId),
      { params: filters }
    );
    return response.data.data;
  },

  /**
   * Get a single party by ID
   */
  async getById(organizationId: number, partyId: number): Promise<Party> {
    const response = await apiClient.get<ApiResponse<Party>>(
      PARTY_ENDPOINTS.DETAIL(organizationId, partyId)
    );
    return response.data.data;
  },

  /**
   * Create a new party
   */
  async create(organizationId: number, data: CreatePartyInput): Promise<Party> {
    const response = await apiClient.post<ApiResponse<Party>>(
      PARTY_ENDPOINTS.CREATE(organizationId),
      data
    );
    return response.data.data;
  },

  /**
   * Update a party (full update)
   */
  async update(
    organizationId: number,
    partyId: number,
    data: UpdatePartyInput
  ): Promise<Party> {
    const response = await apiClient.put<ApiResponse<Party>>(
      PARTY_ENDPOINTS.UPDATE(organizationId, partyId),
      data
    );
    return response.data.data;
  },

  /**
   * Delete a party
   */
  async delete(organizationId: number, partyId: number): Promise<void> {
    await apiClient.delete(PARTY_ENDPOINTS.DELETE(organizationId, partyId));
  },

  /**
   * Toggle party status
   */
  async toggleStatus(organizationId: number, partyId: number): Promise<Party> {
    const response = await apiClient.post<ApiResponse<Party>>(
      PARTY_ENDPOINTS.TOGGLE_STATUS(organizationId, partyId)
    );
    return response.data.data;
  },

  /**
   * Search parties
   */
  async search(organizationId: number, query: string): Promise<Party[]> {
    const response = await apiClient.get<ApiResponse<Party[]>>(
      PARTY_ENDPOINTS.SEARCH(organizationId),
      { params: { q: query } }
    );
    return response.data.data;
  },

  /**
   * Get party statistics
   */
  async getStatistics(organizationId: number): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(
      PARTY_ENDPOINTS.STATISTICS(organizationId)
    );
    return response.data.data;
  },
};

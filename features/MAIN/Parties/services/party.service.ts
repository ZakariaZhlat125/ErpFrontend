import { apiClient } from '@/lib/api/client';
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
      `/organizations/${organizationId}/parties`,
      { params: filters }
    );
    return response.data.data;
  },

  /**
   * Get a single party by ID
   */
  async getById(organizationId: number, partyId: number): Promise<Party> {
    const response = await apiClient.get<ApiResponse<Party>>(
      `/organizations/${organizationId}/parties/${partyId}`
    );
    return response.data.data;
  },

  /**
   * Create a new party
   */
  async create(organizationId: number, data: CreatePartyInput): Promise<Party> {
    const response = await apiClient.post<ApiResponse<Party>>(
      `/organizations/${organizationId}/parties`,
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
      `/organizations/${organizationId}/parties/${partyId}`,
      data
    );
    return response.data.data;
  },

  /**
   * Delete a party
   */
  async delete(organizationId: number, partyId: number): Promise<void> {
    await apiClient.delete(`/organizations/${organizationId}/parties/${partyId}`);
  },

  /**
   * Toggle party status
   */
  async toggleStatus(organizationId: number, partyId: number): Promise<Party> {
    const response = await apiClient.post<ApiResponse<Party>>(
      `/organizations/${organizationId}/parties/${partyId}/toggle-status`
    );
    return response.data.data;
  },

  /**
   * Search parties
   */
  async search(organizationId: number, query: string): Promise<Party[]> {
    const response = await apiClient.get<ApiResponse<Party[]>>(
      `/organizations/${organizationId}/parties/search`,
      { params: { q: query } }
    );
    return response.data.data;
  },

  /**
   * Get party statistics
   */
  async getStatistics(organizationId: number): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>(
      `/organizations/${organizationId}/parties/statistics`
    );
    return response.data.data;
  },
};

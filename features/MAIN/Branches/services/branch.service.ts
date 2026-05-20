import { apiClient } from '@/lib/api/client';
import type {
  Branch,
  CreateBranchInput,
  UpdateBranchInput,
  BranchFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types/branch.types';

/**
 * Branch API service
 * All API calls for branch management
 */
export const branchApi = {
  /**
   * Get all branches for an organization
   */
  async getAll(organizationId: number, filters?: BranchFilters): Promise<Branch[]> {
    const response = await apiClient.get<ApiResponse<Branch[]>>(
      `/organizations/${organizationId}/branches`,
      { params: filters }
    );
    return response.data.data;
  },

  /**
   * Get a single branch by ID
   */
  async getById(organizationId: number, branchId: number): Promise<Branch> {
    const response = await apiClient.get<ApiResponse<Branch>>(
      `/organizations/${organizationId}/branches/${branchId}`
    );
    return response.data.data;
  },

  /**
   * Create a new branch
   */
  async create(organizationId: number, data: CreateBranchInput): Promise<Branch> {
    const response = await apiClient.post<ApiResponse<Branch>>(
      `/organizations/${organizationId}/branches`,
      data
    );
    return response.data.data;
  },

  /**
   * Update a branch (full update)
   */
  async update(
    organizationId: number,
    branchId: number,
    data: UpdateBranchInput
  ): Promise<Branch> {
    const response = await apiClient.put<ApiResponse<Branch>>(
      `/organizations/${organizationId}/branches/${branchId}`,
      data
    );
    return response.data.data;
  },

  /**
   * Delete a branch
   */
  async delete(organizationId: number, branchId: number): Promise<void> {
    await apiClient.delete(`/organizations/${organizationId}/branches/${branchId}`);
  },

  /**
   * Toggle branch status
   */
  async toggleStatus(organizationId: number, branchId: number): Promise<Branch> {
    const response = await apiClient.post<ApiResponse<Branch>>(
      `/organizations/${organizationId}/branches/${branchId}/toggle-status`
    );
    return response.data.data;
  },
};

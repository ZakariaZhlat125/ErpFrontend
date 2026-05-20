import { describe, it, expect, vi, beforeEach } from 'vitest';
import { organizationApi } from '../services/organization.service';
import apiClient from '@/lib/api/client';
import { Organization, CreateOrganizationInput, UpdateOrganizationInput } from '../types/organization.types';

vi.mock('@/lib/api/client');

describe('organizationApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all organizations without filters', async () => {
      const mockOrganizations: Organization[] = [
        {
          id: 1,
          user_id: 1,
          name: 'Test Org',
          legal_name: 'Test Organization LLC',
          tax_number: '123456789',
          base_currency_id: 1,
          timezone: 'UTC',
          locale: 'en',
          status: 'active',
          address: '123 Test St',
          phone: '1234567890',
          email: 'test@example.com',
          website: 'https://test.com',
          logo_path: null,
          created_at: '2024-01-01T00:00:00.000000Z',
          updated_at: '2024-01-01T00:00:00.000000Z',
          deleted_at: null,
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({
        data: { data: mockOrganizations },
      } as any);

      const result = await organizationApi.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/organizations');
      expect(result).toEqual(mockOrganizations);
    });

    it('should fetch organizations with filters', async () => {
      const mockOrganizations: Organization[] = [];
      const filters = { status: 'active' as const, search: 'test' };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: { data: mockOrganizations },
      } as any);

      await organizationApi.getAll(filters);

      expect(apiClient.get).toHaveBeenCalledWith('/organizations?status=active&search=test');
    });
  });

  describe('getById', () => {
    it('should fetch a single organization by id', async () => {
      const mockOrganization: Organization = {
        id: 1,
        user_id: 1,
        name: 'Test Org',
        legal_name: 'Test Organization LLC',
        tax_number: '123456789',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
        logo_path: null,
        created_at: '2024-01-01T00:00:00.000000Z',
        updated_at: '2024-01-01T00:00:00.000000Z',
        deleted_at: null,
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: { data: mockOrganization },
      } as any);

      const result = await organizationApi.getById(1);

      expect(apiClient.get).toHaveBeenCalledWith('/organizations/1');
      expect(result).toEqual(mockOrganization);
    });
  });

  describe('create', () => {
    it('should create a new organization', async () => {
      const input: CreateOrganizationInput = {
        name: 'New Org',
        legal_name: 'New Organization LLC',
        tax_number: '987654321',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active',
        address: '456 New St',
        phone: '0987654321',
        email: 'new@example.com',
      };

      const mockOrganization: Organization = {
        ...input,
        id: 2,
        user_id: 1,
        website: null,
        logo_path: null,
        created_at: '2024-01-01T00:00:00.000000Z',
        updated_at: '2024-01-01T00:00:00.000000Z',
        deleted_at: null,
      };

      vi.mocked(apiClient.post).mockResolvedValue({
        data: { data: mockOrganization },
      } as any);

      const result = await organizationApi.create(input);

      expect(apiClient.post).toHaveBeenCalledWith('/organizations', input);
      expect(result).toEqual(mockOrganization);
    });
  });

  describe('update', () => {
    it('should update an existing organization', async () => {
      const input: UpdateOrganizationInput = {
        name: 'Updated Org',
      };

      const mockOrganization: Organization = {
        id: 1,
        user_id: 1,
        name: 'Updated Org',
        legal_name: 'Test Organization LLC',
        tax_number: '123456789',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
        logo_path: null,
        created_at: '2024-01-01T00:00:00.000000Z',
        updated_at: '2024-01-01T00:00:00.000000Z',
        deleted_at: null,
      };

      vi.mocked(apiClient.put).mockResolvedValue({
        data: { data: mockOrganization },
      } as any);

      const result = await organizationApi.update(1, input);

      expect(apiClient.put).toHaveBeenCalledWith('/organizations/1', input);
      expect(result).toEqual(mockOrganization);
    });
  });

  describe('delete', () => {
    it('should delete an organization', async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({} as any);

      await organizationApi.delete(1);

      expect(apiClient.delete).toHaveBeenCalledWith('/organizations/1');
    });
  });

  describe('patch', () => {
    it('should partially update an organization', async () => {
      const input: Partial<UpdateOrganizationInput> = {
        status: 'inactive',
      };

      const mockOrganization: Organization = {
        id: 1,
        user_id: 1,
        name: 'Test Org',
        legal_name: 'Test Organization LLC',
        tax_number: '123456789',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'inactive',
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
        logo_path: null,
        created_at: '2024-01-01T00:00:00.000000Z',
        updated_at: '2024-01-01T00:00:00.000000Z',
        deleted_at: null,
      };

      vi.mocked(apiClient.patch).mockResolvedValue({
        data: { data: mockOrganization },
      } as any);

      const result = await organizationApi.patch(1, input);

      expect(apiClient.patch).toHaveBeenCalledWith('/organizations/1', input);
      expect(result).toEqual(mockOrganization);
    });
  });
});

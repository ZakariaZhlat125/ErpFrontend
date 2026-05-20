import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOrganizations, useOrganization, useCreateOrganization, useUpdateOrganization, useDeleteOrganization } from '../hooks/useOrganizations';
import { organizationApi } from '../services/organization.service';
import React, { ReactNode } from 'react';

vi.mock('../services/organization.service');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  function TestWrapper({ children }: { children: ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  }

  return TestWrapper;
};

describe('useOrganizations hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useOrganizations', () => {
    it('should fetch organizations successfully', async () => {
      const mockOrganizations = [
        {
          id: 1,
          user_id: 1,
          name: 'Test Org',
          legal_name: 'Test Org LLC',
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

      vi.mocked(organizationApi.getAll).mockResolvedValue(mockOrganizations as any);

      const { result } = renderHook(() => useOrganizations(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockOrganizations);
      expect(organizationApi.getAll).toHaveBeenCalledWith(undefined);
    });

    it('should fetch organizations with filters', async () => {
      const filters = { status: 'active' as const };
      vi.mocked(organizationApi.getAll).mockResolvedValue([]);

      const { result } = renderHook(() => useOrganizations(filters), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(organizationApi.getAll).toHaveBeenCalledWith(filters);
    });
  });

  describe('useOrganization', () => {
    it('should fetch a single organization', async () => {
      const mockOrganization = {
        id: 1,
        user_id: 1,
        name: 'Test Org',
        legal_name: 'Test Org LLC',
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

      vi.mocked(organizationApi.getById).mockResolvedValue(mockOrganization as any);

      const { result } = renderHook(() => useOrganization(1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockOrganization);
      expect(organizationApi.getById).toHaveBeenCalledWith(1);
    });

    it('should not fetch when id is 0', () => {
      const { result } = renderHook(() => useOrganization(0), {
        wrapper: createWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(organizationApi.getById).not.toHaveBeenCalled();
    });
  });

  describe('useCreateOrganization', () => {
    it('should create an organization', async () => {
      const newOrg = {
        name: 'New Org',
        legal_name: 'New Org LLC',
        tax_number: '987654321',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active',
        address: '456 New St',
        phone: '0987654321',
        email: 'new@example.com',
        website: 'https://new.com',
      };
      const createdOrg = {
        id: 1,
        user_id: 1,
        ...newOrg,
        logo_path: null,
        created_at: '2024-01-01T00:00:00.000000Z',
        updated_at: '2024-01-01T00:00:00.000000Z',
        deleted_at: null,
      };

      vi.mocked(organizationApi.create).mockResolvedValue(createdOrg as any);

      const { result } = renderHook(() => useCreateOrganization(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(newOrg as any);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(organizationApi.create).toHaveBeenCalledWith(newOrg);
      expect(result.current.data).toEqual(createdOrg);
    });
  });

  describe('useUpdateOrganization', () => {
    it('should update an organization', async () => {
      const updateData = { name: 'Updated Org' };
      const updatedOrg = {
        id: 1,
        user_id: 1,
        name: 'Updated Org',
        legal_name: 'Updated Org LLC',
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

      vi.mocked(organizationApi.update).mockResolvedValue(updatedOrg as any);

      const { result } = renderHook(() => useUpdateOrganization(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ id: 1, data: updateData });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(organizationApi.update).toHaveBeenCalledWith(1, updateData);
      expect(result.current.data).toEqual(updatedOrg);
    });
  });

  describe('useDeleteOrganization', () => {
    it('should delete an organization', async () => {
      vi.mocked(organizationApi.delete).mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteOrganization(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(1);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(organizationApi.delete).toHaveBeenCalledWith(1);
    });
  });
});

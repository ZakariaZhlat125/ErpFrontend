"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../services/users.service';
import { 
  User, 
  CreateUserInput, 
  UpdateUserInput, 
  UserFilters, 
  PaginatedResult 
} from '../types/users.types';
import { QUERY_KEY } from '../constants/users.constants';

/**
 * Get all users with optional filters
 */
export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => usersApi.getAll(filters),
  });
};

/**
 * Get a single user by ID
 */
export const useUser = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
};

/**
 * Create a new user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserInput) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

/**
 * Update an existing user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateUserInput> }) => 
      usersApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
};

/**
 * Delete a user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

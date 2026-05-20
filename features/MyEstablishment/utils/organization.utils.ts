import { Organization } from '../types/organization.types';

/**
 * Format phone number to a consistent format
 * @param phone - Raw phone number
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Format organization status for display
 * @param status - Organization status
 * @returns Formatted status string
 */
export function formatStatus(status: Organization['status']): string {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
  };
  
  return statusMap[status] || status;
}

/**
 * Get status color based on organization status
 * @param status - Organization status
 * @returns Color identifier
 */
export function getStatusColor(status: Organization['status']): 'success' | 'warning' | 'info' {
  const colorMap = {
    active: 'success' as const,
    inactive: 'warning' as const,
    pending: 'info' as const,
  };
  
  return colorMap[status] || 'info';
}

/**
 * Validate tax number format
 * @param taxNumber - Tax number to validate
 * @returns True if valid
 */
export function isValidTaxNumber(taxNumber: string): boolean {
  return /^\d{9,15}$/.test(taxNumber.replace(/\D/g, ''));
}

/**
 * Transform organization data from API to UI format
 * @param org - Organization from API
 * @returns Transformed organization
 */
export function transformOrganizationFromAPI(org: Organization): Organization {
  return {
    ...org,
    phone: formatPhoneNumber(org.phone),
  };
}

/**
 * Get initials from organization name
 * @param name - Organization name
 * @returns Initials (max 2 characters)
 */
export function getOrganizationInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if organization is active
 * @param org - Organization to check
 * @returns True if active
 */
export function isOrganizationActive(org: Organization): boolean {
  return org.status === 'active';
}

/**
 * Sort organizations by name
 * @param orgs - Array of organizations
 * @returns Sorted array
 */
export function sortOrganizationsByName(orgs: Organization[]): Organization[] {
  return [...orgs].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Filter organizations by status
 * @param orgs - Array of organizations
 * @param status - Status to filter by
 * @returns Filtered array
 */
export function filterOrganizationsByStatus(
  orgs: Organization[],
  status: Organization['status']
): Organization[] {
  return orgs.filter(org => org.status === status);
}

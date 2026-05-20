import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyEstablishment } from '../MyEstablishment';
import { useMyEstablishment } from '../hooks/useMyEstablishment';

vi.mock('../hooks/useMyEstablishment');
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('MyEstablishment Component', () => {
  const mockHandlers = {
    organizations: [],
    isLoading: false,
    error: null,
    selectedOrganization: null,
    deleteConfirm: null,
    isCreateModalOpen: false,
    isEditModalOpen: false,
    handleSelectEstablishment: vi.fn(),
    handleOpenCreateModal: vi.fn(),
    handleCloseCreateModal: vi.fn(),
    handleOpenEditModal: vi.fn(),
    handleCloseEditModal: vi.fn(),
    handleEdit: vi.fn(),
    handleDelete: vi.fn(),
    handleCancelDelete: vi.fn(),
    handleQuickAccess: vi.fn(),
    isDeleting: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading skeleton when loading', () => {
    vi.mocked(useMyEstablishment).mockReturnValue({
      ...mockHandlers,
      isLoading: true,
    });

    render(<MyEstablishment />);

    // Skeleton should be rendered (check for multiple skeleton elements)
    const skeletonElements = screen.getAllByRole('presentation', { hidden: true });
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('should render error message when there is an error', () => {
    vi.mocked(useMyEstablishment).mockReturnValue({
      ...mockHandlers,
      error: new Error('Failed to load'),
    });

    render(<MyEstablishment />);

    expect(screen.getByText(/error loading organizations/i)).toBeDefined();
  });

  it('should render organizations when loaded', () => {
    const mockOrganizations = [
      {
        id: 1,
        name: 'Test Organization',
        legal_name: 'Test Org LLC',
        tax_number: '123456789',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active' as const,
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
      },
    ];

    vi.mocked(useMyEstablishment).mockReturnValue({
      ...mockHandlers,
      organizations: mockOrganizations,
    });

    render(<MyEstablishment />);

    expect(screen.getByText('Test Organization')).toBeDefined();
    expect(screen.getByText('Test Org LLC')).toBeDefined();
  });

  it('should call handleOpenCreateModal when add button is clicked', () => {
    vi.mocked(useMyEstablishment).mockReturnValue(mockHandlers);

    render(<MyEstablishment />);

    const addButton = screen.getByRole('button', { name: /addNew/i });
    fireEvent.click(addButton);

    expect(mockHandlers.handleOpenCreateModal).toHaveBeenCalledTimes(1);
  });

  it('should call handleSelectEstablishment when organization card is clicked', () => {
    const mockOrganizations = [
      {
        id: 1,
        name: 'Test Organization',
        legal_name: 'Test Org LLC',
        tax_number: '123456789',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active' as const,
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
      },
    ];

    vi.mocked(useMyEstablishment).mockReturnValue({
      ...mockHandlers,
      organizations: mockOrganizations,
    });

    render(<MyEstablishment />);

    const orgCard = screen.getByRole('button', { name: /select test organization/i });
    fireEvent.click(orgCard);

    expect(mockHandlers.handleSelectEstablishment).toHaveBeenCalledWith(1);
  });

  it('should support keyboard navigation on organization cards', () => {
    const mockOrganizations = [
      {
        id: 1,
        name: 'Test Organization',
        legal_name: 'Test Org LLC',
        tax_number: '123456789',
        base_currency_id: 1,
        timezone: 'UTC',
        locale: 'en',
        status: 'active' as const,
        address: '123 Test St',
        phone: '1234567890',
        email: 'test@example.com',
        website: 'https://test.com',
      },
    ];

    vi.mocked(useMyEstablishment).mockReturnValue({
      ...mockHandlers,
      organizations: mockOrganizations,
    });

    render(<MyEstablishment />);

    const orgCard = screen.getByRole('button', { name: /select test organization/i });
    
    // Test Enter key
    fireEvent.keyDown(orgCard, { key: 'Enter' });
    expect(mockHandlers.handleSelectEstablishment).toHaveBeenCalledWith(1);

    // Test Space key
    fireEvent.keyDown(orgCard, { key: ' ' });
    expect(mockHandlers.handleSelectEstablishment).toHaveBeenCalledWith(1);
  });
});

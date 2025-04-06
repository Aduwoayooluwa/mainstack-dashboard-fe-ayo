import React from 'react';
import { renderWithProviders } from '../../setup';
import { FilterTransactions } from '@/components/dialog/filter-transactions';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockFilters = {
    dateRange: { startDate: '', endDate: '' },
    types: [],
    status: [],
    filterDay: ''
};

describe('FilterTransactions Component', () => {
    const mockOnClose = jest.fn();
    const mockOnApplyFilter = jest.fn();
    const mockOnClearFilter = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders filter options correctly', () => {
        renderWithProviders(
            <FilterTransactions 
                onClose={mockOnClose}
                onApplyFilter={mockOnApplyFilter}
                currentFilters={mockFilters}
                onClearFilter={mockOnClearFilter}
            />
        );

        expect(screen.getByText('Filter')).toBeInTheDocument();
        expect(screen.getByText('Date Range')).toBeInTheDocument();
        expect(screen.getByText('Transaction Type')).toBeInTheDocument();
        expect(screen.getByText('Transaction Status')).toBeInTheDocument();
    });

    it('applies filter day selection', async () => {
        renderWithProviders(
            <FilterTransactions 
                onClose={mockOnClose}
                onApplyFilter={mockOnApplyFilter}
                currentFilters={mockFilters}
                onClearFilter={mockOnClearFilter}
            />
        );

        const todayButton = screen.getByText('Today');
        await userEvent.click(todayButton);

        const applyButton = screen.getByText('Apply');
        await userEvent.click(applyButton);

        expect(mockOnApplyFilter).toHaveBeenCalledWith({
            ...mockFilters,
            filterDay: 'Today'
        });
    });

    it('clears all filters', async () => {
        const filtersWithData = {
            dateRange: { startDate: '2024-01-01', endDate: '2024-01-31' },
            types: ['deposit'],
            status: ['successful'],
            filterDay: 'Today'
        };

        renderWithProviders(
            <FilterTransactions 
                onClose={mockOnClose}
                onApplyFilter={mockOnApplyFilter}
                currentFilters={filtersWithData}
                onClearFilter={mockOnClearFilter}
            />
        );

        const clearButton = screen.getByText('Clear');
        await userEvent.click(clearButton);

        expect(mockOnClearFilter).toHaveBeenCalled();
    });

    it('handles transaction type selection', async () => {
        renderWithProviders(
            <FilterTransactions 
                onClose={mockOnClose}
                onApplyFilter={mockOnApplyFilter}
                currentFilters={mockFilters}
                onClearFilter={mockOnClearFilter}
            />
        );

        const typeSelect = screen.getByText('Select Transaction Type').closest('button');
        await userEvent.click(typeSelect!);

        const depositOption = screen.getByText('Deposit');
        await userEvent.click(depositOption);

        const applyButton = screen.getByText('Apply');
        await userEvent.click(applyButton);

        expect(mockOnApplyFilter).toHaveBeenCalledWith({
            ...mockFilters,
            types: ['deposit']
        });
    });

    it('handles transaction status selection', async () => {
        renderWithProviders(
            <FilterTransactions 
                onClose={mockOnClose}
                onApplyFilter={mockOnApplyFilter}
                currentFilters={mockFilters}
                onClearFilter={mockOnClearFilter}
            />
        );

        const statusSelect = screen.getByText('Select Transaction Status').closest('button');
        await userEvent.click(statusSelect!);

        const successfulOption = screen.getByText('Successful');
        await userEvent.click(successfulOption);

        const applyButton = screen.getByText('Apply');
        await userEvent.click(applyButton);

        expect(mockOnApplyFilter).toHaveBeenCalledWith({
            ...mockFilters,
            status: ['successful']
        });
    });
}); 
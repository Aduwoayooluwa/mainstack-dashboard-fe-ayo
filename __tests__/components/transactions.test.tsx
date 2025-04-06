import React from 'react';
import { renderWithProviders } from '@/__tests__/setup';
import Transactions from '@/components/transactions';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the icons
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

jest.mock('@/components/chart', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-chart">Chart</div>,
}));

describe('Transactions Component', () => {
    const mockTransactions = [
        {
            amount: 100,
            metadata: { name: 'John Doe', product_name: 'Product 1' },
            payment_reference: 'ref1',
            status: 'successful',
            type: 'deposit',
            date: '2024-03-01'
        },
        {
            amount: 200,
            metadata: { name: 'Jane Smith', product_name: 'Product 2' },
            payment_reference: 'ref2',
            status: 'pending',
            type: 'withdrawal',
            date: '2024-03-02'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of transactions', () => {
        renderWithProviders(<Transactions data={mockTransactions} />);
        expect(screen.getByText('2 transactions')).toBeInTheDocument();
    });

    it('displays transaction details correctly', () => {
        renderWithProviders(<Transactions data={mockTransactions} />);
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('USD 100.00')).toBeInTheDocument();
    });

    it('opens filter modal when filter button is clicked', async () => {
        renderWithProviders(<Transactions data={mockTransactions} />);
        const filterButton = screen.getByRole('button', { name: /filter/i });
        await userEvent.click(filterButton);
        expect(screen.getByTestId('modal-background')).toBeInTheDocument();
    });

    it('displays correct status indicators', () => {
        renderWithProviders(<Transactions data={mockTransactions} />);
        const successfulIcon = screen.getByAltText('call received');
        const pendingIcon = screen.getByAltText('call made');
        expect(successfulIcon.closest('span')).toHaveClass('bg-[#E3FCF2]');
        expect(pendingIcon.closest('span')).toHaveClass('bg-[#FEE3E3]');
    });

    it('shows NoData component when there are no transactions', () => {
        renderWithProviders(<Transactions data={[]} />);
        expect(screen.getByText('No matching transaction found for the selected filter')).toBeInTheDocument();
    });
}); 
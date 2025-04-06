import React from 'react';
import { renderWithProviders } from '@/__tests__/setup';
import Home from '@/app/page';
import { screen, waitFor } from '@testing-library/react';

// mock functions for the api service
const mockGetWallet = jest.fn();
const mockGetTransactions = jest.fn();

// mocking the api service
jest.mock('@/config/api.service', () => ({
    ApiService: {
        getWallet: () => mockGetWallet(),
        getTransactions: () => mockGetTransactions(),
    },
}));

// mocking the components
jest.mock('@/components/app-bar', () => ({
    __esModule: true,
    default: () => <div data-testid="mock-app-bar">App Bar</div>,
}));

jest.mock('@/components/chart', () => ({
    __esModule: true,
    default: () => <div>Chart</div>,
}));

jest.mock('@/components/transactions', () => ({
    __esModule: true,
    default: ({ data }: { data: Transaction[] }) => (
        <div>
            Transactions: {data.length}
        </div>
    ),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

interface Transaction {
    amount: number;
    metadata: {
        name: string;
        product_name: string;
    };
    payment_reference: string;
    status: string;
    type: string;
    date: string;
}

describe('Home Page', () => {
    const mockWalletData = {
        balance: 1000,
        ledger_balance: 2000,
        total_payout: 3000,
        total_revenue: 4000,
        pending_payout: 500,
    };

    const mockTransactionsData: Transaction[] = [
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
        mockGetWallet.mockResolvedValue(mockWalletData);
        mockGetTransactions.mockResolvedValue(mockTransactionsData);
    });

    it('renders loading states initially', () => {
        renderWithProviders(<Home />);
        
        // I check if the loading elements are present
        const loadingElements = screen.getAllByTestId('mock-app-bar');
        expect(loadingElements.length).toBeGreaterThan(0);
    });

    it('renders wallet data after loading', async () => {
        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('USD 1,000.00')).toBeInTheDocument();
            expect(screen.getByText('USD 2,000.00')).toBeInTheDocument();
            expect(screen.getByText('USD 3,000.00')).toBeInTheDocument();
            expect(screen.getByText('USD 4,000.00')).toBeInTheDocument();
            expect(screen.getByText('USD 500.00')).toBeInTheDocument();
        });
    });

    it('renders transactions after loading', async () => {
        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Transactions: 2')).toBeInTheDocument();
        });
    });

    it('renders chart with transaction data', async () => {
        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Chart')).toBeInTheDocument();
        });
    });

    it('renders app bar in correct position', () => {
        renderWithProviders(<Home />);
        const appBar = screen.getByTestId('mock-app-bar');
        expect(appBar).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
        mockGetWallet.mockRejectedValue(new Error('API Error'));
        mockGetTransactions.mockRejectedValue(new Error('API Error'));

        renderWithProviders(<Home />);

        await waitFor(() => {
            // I am checking if the loading elements are present
            const loadingElements = screen.getAllByTestId('mock-app-bar');
            expect(loadingElements.length).toBeGreaterThan(0);
        });
    });

    it('handles empty transaction data', async () => {
        mockGetTransactions.mockResolvedValue([]);

        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Transactions: 0')).toBeInTheDocument();
        });
    });
}); 
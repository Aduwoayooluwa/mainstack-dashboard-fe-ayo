import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { degular } from '@/lib/fonts';
import React from 'react';

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});


export function renderWithProviders(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    
    return render(
        <div className={degular.className}>
            <QueryClientProvider client={testQueryClient}>
                {ui}
            </QueryClientProvider>
        </div>
    );
}

afterEach(() => {
    jest.clearAllMocks();
});

test('setup file is working', () => {
    expect(true).toBe(true);
}); 
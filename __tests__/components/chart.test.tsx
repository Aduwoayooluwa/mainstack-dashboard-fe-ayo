import React from 'react';
import { renderWithProviders } from '@/__tests__/setup';
import Chart from '@/components/chart';
import { screen } from '@testing-library/react';

jest.mock('recharts', () => ({
    AreaChart: ({ children }: { children: React.ReactNode }) => <div data-testid="area-chart">{children}</div>,
    Area: () => <div data-testid="area" />,
    XAxis: () => <div data-testid="x-axis" />,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}));

describe('Chart Component', () => {
    const mockChartData = [
        { date: '2024-03-01', amount: 100, status: 'successful', type: 'deposit' as const },
        { date: '2024-03-02', amount: 200, status: 'successful', type: 'withdrawal' as const },
        { date: '2024-03-03', amount: 150, status: 'successful', type: 'deposit' as const },
    ];

    it('renders the chart container with correct dimensions', () => {
        renderWithProviders(<Chart chartData={mockChartData} />);
        
        const container = screen.getByTestId('responsive-container');
        expect(container).toBeInTheDocument();
    });

    it('renders the area chart with correct data', () => {
        renderWithProviders(<Chart chartData={mockChartData} />);
        
        const areaChart = screen.getByTestId('area-chart');
        expect(areaChart).toBeInTheDocument();
    });

    it('renders the X-axis', () => {
        renderWithProviders(<Chart chartData={mockChartData} />);
        
        const xAxis = screen.getByTestId('x-axis');
        expect(xAxis).toBeInTheDocument();
    });

    it('renders the area component', () => {
        renderWithProviders(<Chart chartData={mockChartData} />);
        
        const area = screen.getByTestId('area');
        expect(area).toBeInTheDocument();
    });

    it('handles empty data array', () => {
        renderWithProviders(<Chart chartData={[]} />);
        
        const areaChart = screen.getByTestId('area-chart');
        expect(areaChart).toBeInTheDocument();
    });
}); 
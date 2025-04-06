import React from 'react';
import { renderWithProviders } from '@/__tests__/setup';
import { DatePicker } from '@/components/date-picker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DatePicker Component', () => {
    const mockOnSelect = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not render when isOpen is false', () => {
        renderWithProviders(
            <DatePicker
                isOpen={false}
                onClose={mockOnClose}
                onSelect={mockOnSelect}
            />
        );

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders calendar when isOpen is true', () => {
        renderWithProviders(
            <DatePicker
                isOpen={true}
                onClose={mockOnClose}
                onSelect={mockOnSelect}
            />
        );

        // Check for month/year display
        expect(screen.getByText(/, \d{4}$/)).toBeInTheDocument();
        
        // Check for week days
        expect(screen.getByText('Sun')).toBeInTheDocument();
        expect(screen.getByText('Mon')).toBeInTheDocument();
        expect(screen.getByText('Tue')).toBeInTheDocument();
        expect(screen.getByText('Wed')).toBeInTheDocument();
        expect(screen.getByText('Thu')).toBeInTheDocument();
        expect(screen.getByText('Fri')).toBeInTheDocument();
        expect(screen.getByText('Sat')).toBeInTheDocument();
    });

    it('navigates between months', async () => {
        renderWithProviders(
            <DatePicker
                isOpen={true}
                onClose={mockOnClose}
                onSelect={mockOnSelect}
            />
        );

        const currentMonth = screen.getByText(/, \d{4}$/).textContent;
        
        // Click next month button
        const nextButton = screen.getByAltText('chevron right').closest('button');
        await userEvent.click(nextButton!);
        
        const nextMonth = screen.getByText(/, \d{4}$/).textContent;
        expect(nextMonth).not.toBe(currentMonth);

        // Click previous month button
        const prevButton = screen.getByAltText('chevron left').closest('button');
        await userEvent.click(prevButton!);
        
        const prevMonth = screen.getByText(/, \d{4}$/).textContent;
        expect(prevMonth).toBe(currentMonth);
    });

    it('selects a date and calls onSelect and onClose', async () => {
        renderWithProviders(
            <DatePicker
                isOpen={true}
                onClose={mockOnClose}
                onSelect={mockOnSelect}
            />
        );

        // Click on the first day of the month
        const firstDay = screen.getByText('1');
        await userEvent.click(firstDay);

        expect(mockOnSelect).toHaveBeenCalled();
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('highlights selected date when provided', () => {
        const today = new Date();
        const selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        renderWithProviders(
            <DatePicker
                isOpen={true}
                onClose={mockOnClose}
                onSelect={mockOnSelect}
                selectedDate={selectedDate}
            />
        );

        const selectedDay = screen.getByText(String(today.getDate()));
        const button = selectedDay.closest('button');
        expect(button).toHaveClass('h-8', 'w-8', 'rounded-full', 'grid', 'place-items-center', 'transition-colors');
        expect(button).toHaveClass('bg-foreground', 'text-white');
    });
}); 
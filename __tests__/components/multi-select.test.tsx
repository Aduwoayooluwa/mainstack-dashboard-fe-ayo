import React from 'react';
import { renderWithProviders } from '@/__tests__/setup';
import { MultiSelect } from '@/components/multi-select';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' }
];

describe('MultiSelect Component', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with placeholder when no options are selected', () => {
        renderWithProviders(
            <MultiSelect
                options={mockOptions}
                value={[]}
                onChange={mockOnChange}
                placeholder="Select options"
            />
        );

        expect(screen.getByText('Select options')).toBeInTheDocument();
    });

    it('opens dropdown when clicked', async () => {
        renderWithProviders(
            <MultiSelect
                options={mockOptions}
                value={[]}
                onChange={mockOnChange}
            />
        );

        const selectButton = screen.getByRole('button');
        await userEvent.click(selectButton);

        mockOptions.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('selects an option when clicked', async () => {
        renderWithProviders(
            <MultiSelect
                options={mockOptions}
                value={[]}
                onChange={mockOnChange}
            />
        );

        const selectButton = screen.getByRole('button');
        await userEvent.click(selectButton);

        const option1 = screen.getByText('Option 1');
        await userEvent.click(option1);

        expect(mockOnChange).toHaveBeenCalledWith(['1']);
    });

    it('deselects an option when clicked again', async () => {
        renderWithProviders(
            <MultiSelect
                options={mockOptions}
                value={['1']}
                onChange={mockOnChange}
            />
        );

        const selectButton = screen.getByRole('button');
        await userEvent.click(selectButton);

        // Get all elements with text "Option 1" and select the one in the dropdown
        const option1Elements = screen.getAllByText('Option 1');
        const option1InDropdown = option1Elements.find(el => 
            el.closest('div')?.classList.contains('cursor-pointer')
        );
        await userEvent.click(option1InDropdown!);

        expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it('displays selected options in the button text', () => {
        renderWithProviders(
            <MultiSelect
                options={mockOptions}
                value={['1', '2']}
                onChange={mockOnChange}
            />
        );

        expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();
    });

    it('shows checkmark for selected options', async () => {
        renderWithProviders(
            <MultiSelect
                options={mockOptions}
                value={['1']}
                onChange={mockOnChange}
            />
        );

        const selectButton = screen.getByRole('button');
        await userEvent.click(selectButton);

        // Get all elements with text "Option 1" and find the one with the checkmark
        const option1Elements = screen.getAllByText('Option 1');
        const option1WithCheckmark = option1Elements.find(el => 
            el.closest('div')?.querySelector('div[class*="bg-foreground"]')
        );
        expect(option1WithCheckmark).toBeInTheDocument();
    });
}); 
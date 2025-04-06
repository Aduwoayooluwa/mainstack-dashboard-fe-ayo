import React, { act } from 'react';
import { renderWithProviders } from '../../setup';
import { Modal } from '@/components/dialog/modal';
import { screen, fireEvent } from '@testing-library/react';

describe('Modal Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    it('renders with title and children', () => {
        renderWithProviders(
            <Modal onClose={mockOnClose} title="Test Modal">
                <div>Test Content</div>
            </Modal>
        );

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('closes when clicking the close button', () => {
        renderWithProviders(
            <Modal onClose={mockOnClose} title="Test Modal">
                <div>Test Content</div>
            </Modal>
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        // Fast-forward timers to complete the animation
        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('closes when clicking the background', () => {
        renderWithProviders(
            <Modal onClose={mockOnClose} title="Test Modal">
                <div>Test Content</div>
            </Modal>
        );

        const background = screen.getByTestId('modal-background');
        fireEvent.click(background);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not close when clicking the modal content', () => {
        renderWithProviders(
            <Modal onClose={mockOnClose} title="Test Modal">
                <div>Test Content</div>
            </Modal>
        );

        const modalContent = screen.getByText('Test Content');
        fireEvent.click(modalContent);

        expect(mockOnClose).not.toHaveBeenCalled();
    });
}); 
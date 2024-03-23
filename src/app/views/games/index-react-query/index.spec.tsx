import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameIndex from './index';

// Mock the custom hooks and child components
jest.mock('../../../common/context/theme', () => ({
    useTheme: () => ({ isDarkMode: false }),
}));

const mockUpdateGamesList = jest.fn();
jest.mock('../hooks/useGames', () => ({
    __esModule: true,
    default: () => ({
        games: [],
        updateGamesList: mockUpdateGamesList,
        isLoading: true,
    }),
}));

jest.mock('../hooks/usePlatforms', () => ({
    __esModule: true, // This line helps with ES Module interop
    default: () => ({
        platforms: [
            {
                id: '666',
                name: 'All',
                slug: 'all',
            },
        ],
    }),
}));

jest.mock('../../../library/components/spinner/spinner', () => () => (
    <div>MockedSpinner</div>
));
jest.mock('../../../library/forms/select/select', () => () => (
    <select>MockedSelect</select>
));

jest.mock('../../../library/components/cards/card', () => () => (
    <div>Card</div>
));

describe('GameIndex', () => {
    it('should render successfully', () => {
        render(<GameIndex />);
        const spinner = screen.queryByText('MockedSpinner');
        expect(spinner).toBeInTheDocument();
    });

    it('renders filters for platforms and ordering', () => {
        // Render the GameIndex component
        render(<GameIndex />);
        // Check for the presence of the mocked Select components
        // Since both filters use the same mocked Select component,
        // we'll check if there are exactly two instances rendered.
        const selects = screen.getAllByText('MockedSelect');
        expect(selects.length).toBe(2);
    });
});

import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidenav from './sidenav';

// Mock `useGenres` to return a list of genres
jest.mock('../../views/games/hooks/useGenres', () => ({
    __esModule: true, // This line helps with ES Module compatibility
    default: () => ({
        genres: [
            { id: '1', name: 'Action' },
            { id: '2', name: 'Adventure' },
        ],
    }),
}));

// Mock `useDataContext` if necessary to control its return values
jest.mock('../context/data', () => ({
    useDataContext: () => ({
        outputEvent: jest.fn(),
        event: { data: { reset: false } }, // Adjust based on what you need to test
    }),
}));

// Ensure `useTheme` is mocked if its state influences the component rendering
jest.mock('../context/theme', () => ({
    useTheme: () => ({ isDarkMode: false }),
}));

describe('Sidenav Component', () => {
    let component;

    beforeEach(() => {
        component = () => {
            return render(<Sidenav />);
        };
    });

    afterEach(() => {
        cleanup();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display genre names', () => {
        const { getByText } = render(<Sidenav />);
        // Check for genre names based on the mocked hook data
        expect(getByText('Action')).toBeInTheDocument();
        expect(getByText('Adventure')).toBeInTheDocument();
    });
});

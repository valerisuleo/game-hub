import { render } from '@testing-library/react';

import ListGroup from './list-group';

describe('ListGroup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ListGroup />);
        expect(baseElement).toBeTruthy();
    });
});

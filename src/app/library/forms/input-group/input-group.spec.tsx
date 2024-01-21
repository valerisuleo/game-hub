/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';

import InputGroup from '../input-group/input-group';

describe('InputGroup', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <InputGroup
                label={''}
                value={''}
                onChange={function (): void {
                    throw new Error('Function not implemented.');
                }}
                onBlur={function (name: any, label: any, value: any): void {
                    throw new Error('Function not implemented.');
                }}
                name={''}
                type={''}
            />
        );
        expect(baseElement).toBeTruthy();
    });
});

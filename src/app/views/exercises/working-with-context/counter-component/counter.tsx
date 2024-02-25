/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import { useCounter } from '../context/counter';

const Counter = () => {
    const { value, dispatch } = useCounter();

    return (
        <Fragment>
            <h1>Counter</h1>
            <button className="btn btn-primary mx-1" onClick={() => dispatch({ type: 'ADD' })}>
                +
            </button>
            <button className="btn btn-primary mx-1" onClick={() => dispatch({ type: 'REMOVE' })}>
                -
            </button>

            {value}
        </Fragment>
    );
};

export default Counter;

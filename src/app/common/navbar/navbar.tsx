/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputGroup from '../../library/forms/input-group/input-group';
import ButtonComponent from '../../library/components/button/button';
import { IBtn } from '../../library/components/button/interfaces';
import { useTheme } from '../context/theme';
import { useDataContext } from '../context/data';

const NavbarComponent = () => {
    const { isDarkMode, handleDarkMode } = useTheme();
    const { outputEvent } = useDataContext();
    const [isOpen, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const props: IBtn = {
        type: 'button',
        label: isDarkMode ? 'Light Mode' : 'Dark Mode',
        classes: {
            contextual: 'dark',
            size: 'md',
        },
        onEmitEvent: handleDarkMode,
        isDarkMode,
        className: 'light',
    };

    const toggleBurgerMenu = () => {
        setOpen((prevState) => {
            const newState = !prevState;
            return newState;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setValue(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        outputEvent({
            name: 'search',
            data: {
                value,
            },
        });
        setValue('');
    };

    const handleBlur = () => {};
    return (
        <nav
            className={`navbar navbar-expand-lg bg-${
                isDarkMode ? 'dark' : 'light'
            }`}
        >
            <div className="container-fluid">
                <Link
                    className={`navbar-brand ${isDarkMode && 'text-white'}`}
                    to="/"
                >
                    Game Point
                </Link>
                <button
                    onClick={toggleBurgerMenu}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${isOpen && 'show'}`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/games/react-query" className="nav-link">
                                Try with React Query!
                            </Link>
                        </li>
                    </ul>

                    <div className="d-flex" style={{ width: '80%' }}>
                        <form
                            onSubmit={handleSubmit}
                            className="flex-grow-1 me-5"
                        >
                            <InputGroup
                                label={''}
                                name={'search'}
                                type={'text'}
                                value={value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </form>
                        <div className="d-flex align-items-center">
                            <ButtonComponent {...props} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;

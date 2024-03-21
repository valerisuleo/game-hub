/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './common/navbar/navbar';
import SideNavComponent from './common/side-nav/sidenav';
import { useTheme } from './common/context/theme';
import SpinnerComponent from './library/components/spinner/spinner';

const GameRouter = lazy(() => import('./views/games/routes'));

const RoutingModule = () => {
    const { isDarkMode } = useTheme();
    return (
        <Fragment>
            <NavbarComponent />
            <main className="container-fluid">
                <div className="row">
                    <div
                        className={`col-md-3 col-lg-3 col-xl-2 ${
                            isDarkMode && 'bg-dark'
                        }`}
                    >
                        <SideNavComponent />
                    </div>
                    <div className="col-md-9 col-lg-9 col-xl-10">
                        <Suspense fallback={<SpinnerComponent color={'primary'} />}>
                            <Routes>
                                {/* Redirect from base path to /games */}
                                <Route
                                    path="/"
                                    element={<Navigate replace to="/games" />}
                                />
                                <Route
                                    path="/games/*"
                                    element={<GameRouter />}
                                />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default RoutingModule;

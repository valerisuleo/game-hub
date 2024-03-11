/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './common/navbar/navbar';

const GameRouter = lazy(() => import('./views/games/routes'));
const ExercisesRouter = lazy(() => import('./views/exercises/routes'));

const RoutingModule = () => {
    return (
        <Fragment>
            <NavbarComponent />
            <main className="container-fluid">
                <Suspense>
                    <Routes>
                        {/* Redirect from base path to /games */}
                        <Route path="/" element={<Navigate replace to="/games" />} />
                        <Route path="/games/*" element={<GameRouter />} />
                        <Route path="/exercises/*" element={<ExercisesRouter />} />
                    </Routes>
                </Suspense>
            </main>
        </Fragment>
    );
};

export default RoutingModule;

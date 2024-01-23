/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomeRouter = lazy(() => import('./views/home/home'));
const ExercisesRouter = lazy(() => import('./views/exercises/routes'));

const RoutingModule = () => {
    return (
        <Fragment>
            <main className="container-fluid">
                <Suspense>
                    <Routes>
                        <Route path="/" element={<HomeRouter />} />
                        <Route path="/exercises/*" element={<ExercisesRouter />} />
                    </Routes>
                </Suspense>
            </main>
        </Fragment>
    );
};

export default RoutingModule;

import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./home'));

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add more movie-related routes here */}
        </Routes>
    );
};

export default routes;

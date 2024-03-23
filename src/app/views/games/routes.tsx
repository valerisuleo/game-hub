import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import GameIndexWithReactQuery from './index-react-query';

const IndexPage = lazy(() => import('./index/index'));

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/react-query" element={<GameIndexWithReactQuery />} />
        </Routes>
    );
};

export default routes;

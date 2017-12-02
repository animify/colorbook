import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import PageRoute from './PageRoute';

const Router = () => (
    <BrowserRouter>
        <div>
            <HomeRoute />
            <PageRoute />
        </div>
    </BrowserRouter>
);

export default Router;

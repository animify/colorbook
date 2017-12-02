import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';

const Router = () => (
    <BrowserRouter>
        <div>
            <HomeRoute />
        </div>
    </BrowserRouter>
);

export default Router;

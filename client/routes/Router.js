import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import Navbar from './../containers/Navbar';

const Router = () => (
    <BrowserRouter>
        <div>
            <Navbar />
            <div className="content">
                <HomeRoute />
            </div>
        </div>
    </BrowserRouter>
);

export default Router;

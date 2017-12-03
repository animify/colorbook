import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import Navbar from './../containers/Navbar';
import Footer from './../containers/Footer';

const Router = () => (
    <BrowserRouter>
        <div id="colorbook">
            <span className="fade" />
            <Navbar />
            <div className="content">
                <HomeRoute />
            </div>
            <Footer />
        </div>
    </BrowserRouter>
);

export default Router;

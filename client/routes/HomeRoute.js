import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Timeline from '../containers/Timeline';
import Preview from '../containers/Preview';
import About from '../containers/About';
import ErrorPage from '../containers/ErrorPage';
import tracker from './../modules/tracker';

const HomeRoute = () => (
    <div>
        <Route exact path="/" component={tracker(Homepage)} />
        <Route exact path="/timeline/:date?" component={tracker(Timeline)} />
        <Route exact path="/s/:id" component={tracker(Preview)} />
        <Route exact path="/about" component={tracker(About)} />
        <Route exact path="/404" component={tracker(ErrorPage)} />
    </div>
);

export default HomeRoute;

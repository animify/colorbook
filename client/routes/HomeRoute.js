import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Timeline from '../containers/Timeline';
import Preview from '../containers/Preview';
import ErrorPage from '../containers/ErrorPage';

const HomeRoute = () => (
    <div>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/timeline/:date?" component={Timeline} />
        <Route exact path="/s/:id" component={Preview} />
        <Route exact path="/404" component={ErrorPage} />
    </div>
);

export default HomeRoute;

import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Timeline from '../containers/Timeline';
import Preview from '../containers/Preview';

const HomeRoute = () => (
    <div>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/timeline" component={Timeline} />
        <Route exact path="/s/:id" component={Preview} />
    </div>
);

export default HomeRoute;

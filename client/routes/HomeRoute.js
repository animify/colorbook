import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Timeline from '../containers/Timeline';

const HomeRoute = () => (
    <div>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/timeline" component={Timeline} />
    </div>
);

export default HomeRoute;

import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../containers/Homepage';

const HomeRoute = () => (
    <Route exact path="/" component={Homepage} />
);

export default HomeRoute;

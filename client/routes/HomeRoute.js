import React from 'react';
import { Route } from 'react-router-dom';
import LandingContainer from '../containers/Landing';

const HomeRoute = () => (
    <Route exact path="/" component={LandingContainer} />
);

export default HomeRoute;

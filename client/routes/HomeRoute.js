import React from 'react';
import { Route } from 'react-router-dom';
import Offline from '../containers/Offline';
import About from '../containers/About';
import wrapper from './../modules/wrapper';

const HomeRoute = () => (
    <div>
        <Route exact path="/" component={wrapper(Offline)} />
        {/* <Route exact path="/timeline/:date?" component={wrapper(Timeline)} />
        <Route exact path="/s/:id" component={wrapper(Preview)} />
        <Route exact path="/404" component={wrapper(ErrorPage)} /> */}
    </div>
);

export default HomeRoute;

import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import Timeline from '../containers/Timeline';
import Preview from '../containers/Preview';
import About from '../containers/About';
import ErrorPage from '../containers/ErrorPage';
import wrapper from './../modules/wrapper';
import CopiedNotification from './../components/CopiedNotification';

const HomeRoute = () => (
    <div>
        <Route exact path="/" component={wrapper(Homepage)} />
        <Route exact path="/timeline/:date?" component={wrapper(Timeline)} />
        <Route exact path="/s/:id" component={wrapper(Preview)} />
        <Route exact path="/about" component={wrapper(About)} />
        <Route exact path="/404" component={wrapper(ErrorPage)} />
    </div>
);

export default HomeRoute;

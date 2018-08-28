import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../containers/About';
import wrapper from './../modules/wrapper';
import ProjectList from '../containers/ProjectList';
import Preview from '../containers/Preview';
import ErrorPage from '../containers/ErrorPage';
import Navbar from '../containers/Navbar';
import Footer from '../containers/Footer';

const HomeRoute = () => (
    <Fragment>
        <Navbar />
        <Switch>
            <Route exact path="/project/:id" component={wrapper(Preview)} />
            <Route exact path="/:param?/:value?" component={wrapper(ProjectList)} />
            <Route exact path="/404" component={wrapper(ErrorPage)} />
            <Route exact path="/about" component={wrapper(About)} />
        </Switch>
        <Footer />
    </Fragment>
);

export default HomeRoute;

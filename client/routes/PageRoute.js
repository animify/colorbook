import React from 'react';
import { Route } from 'react-router-dom';
import PageComponent from './../components/Page';

const PageRoute = () => (
    <Route path="/page" component={PageComponent} />
);

export default PageRoute;

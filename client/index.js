import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheets/styl/blossom.styl';

const appRoot = document.getElementById('app');
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        appRoot
    );
};

render(App);

if (module.hot) module.hot.accept('./App', () => render(App));

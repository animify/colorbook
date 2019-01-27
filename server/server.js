/* eslint global-require: "off" */
/* eslint no-console: "off" */

import express from 'express';
import Webpack from 'webpack';

import Behance from './Behance';
import Endpoint from './Endpoint';
import Db from './database/Db';
import Helpers from './common/helpers';

const path = require('path');

const db = new Db();
const behance = new Behance(db);
const endpoint = new Endpoint(db, behance);
const app = express();

app.use(express.static('static'));

if (process.env.NODE_ENV === 'development') {
    const config = require('../webpack.config.client');
    const compiler = Webpack(config);

    app.use(
        require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
        })
    );

    app.use(
        require('webpack-hot-middleware')(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000,
        })
    );
}

app.get('/api/project/:id', (req, res) => {
    const id = req.params.id;

    endpoint
        .getProjectById(id)
        .then(projectObject => {
            res.send(projectObject);
        })
        .catch(projectObject => {
            res.send(projectObject);
        });
});

app.get('/api/:param/:value', (req, res) => {
    endpoint.getProjects(req.params.param, req.params.value).then(projects => {
        res.send(projects);
    });
});

if (process.env.NODE_ENV === 'development') {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client/local.html'));
    });
} else {
    app.listen(Helpers.serverConfig.ports.production, '0.0.0.0', () => {
        console.log(`The Colorbook production server running on port ${Helpers.serverConfig.ports.production}`);
    });
}

export default app;

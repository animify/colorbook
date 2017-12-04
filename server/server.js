import express from 'express';
import Webpack from 'webpack';
import Extractor from './Extractor';
import Dribbble from './Dribbble';
import Endpoint from './Endpoint';
import Db from './database/Db';

const config = require('../webpack.config.client');
const path = require('path');

const db = new Db();
const dribbble = new Dribbble(db);
const endpoint = new Endpoint(db, dribbble);
const app = express();
const compiler = Webpack(config);

app.use(express.static('static'));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.get('/api/popular', (req, res) => {
    endpoint
        .getPopularShots()
        .then((shotsObject) => {
            res.send(shotsObject);
        });
});

app.get('/api/timeline/:date', (req, res) => {
    const date = req.params.date;

    endpoint
        .getShotsByDate(date)
        .then((shotsObject) => {
            res.send(shotsObject);
        });
});

app.get('/api/shot/:id', (req, res) => {
    const id = req.params.id;

    endpoint
        .getShotById(id)
        .then((shotObject) => {
            res.send(shotObject);
        })
        .catch((shotObject) => {
            res.send(shotObject);
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/local.html'));
});

export default app;

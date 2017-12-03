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

// dribbble.saveData();

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

app.get('/popular', (req, res) => {
    endpoint
        .getPopularShots()
        .then((popularShots) => {
            res.send(popularShots);
        });
});

app.get('/colors', (req, res) => {
    const params = {
        date: '2017-12-01'
    };

    const defaultParams = Object.assign({}, params);

    dribbble.getShots(params)
        .then((shots) => {
            Extractor.extractShots(shots)
                .then((extractedShots) => {
                    const response = {
                        shots: extractedShots,
                        params: defaultParams
                    };

                    res.send(response);
                });
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/local.html'));
});

export default app;

import express from 'express';
import Webpack from 'webpack';
import Extractor from './Extractor';
import Dribbble from './Dribbble';

const config = require('../webpack.config.client');
const path = require('path');

const dribbble = new Dribbble();
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

app.get('/colors', (req, res) => {
    const params = {
        date: '2017-12-01'
    };

    const defaultParams = Object.assign({}, params);

    dribbble.getShots(params)
        .then((shots) => {
            const shotsData = shots.map(shot => Extractor.extractData(shot));

            Promise.all(shotsData).then((e) => {
                const response = {
                    shots: e,
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

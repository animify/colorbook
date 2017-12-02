import express from 'express';
import Webpack from 'webpack';

const config = require('../webpack.config.client');
const path = require('path');

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


app.get('/api', (req, res) => {
    res.send({
        message: 'You can also access routes defined in Express.'
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/local.html'));
});

export default app;

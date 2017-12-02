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
    Extractor.extract('https://cdn.dribbble.com/users/1761489/screenshots/3978268/mujer_1x.jpg')
        .then((colors) => {
            dribbble.getShots();
            res.send(colors.map(color => color.hex()));
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/local.html'));
});

export default app;

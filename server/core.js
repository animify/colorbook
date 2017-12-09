import http from 'http';
import app from './server';
import Helpers from './common/helpers';

const server = http.createServer(app);
let currentApp = app;
server.listen(Helpers.serverConfig.ports.development);

if (module.hot) {
    module.hot.accept('./server', () => {
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
    });
}

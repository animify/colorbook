import needle from 'needle';
import querystring from 'querystring';

import Helpers from './common/helpers';

class Dribbble {
    constructor() {
        this.apiUrl = 'https://api.dribbble.com/v1';
        this.config = Helpers.config;
    }

    buildUrl(endpoint, queryObject) {
        console.log(this.config);
        const tokenedObject = Object.assign(queryObject, {
            access_token: this.config.keys.dribbble_token
        });

        const query = querystring.stringify(tokenedObject);
        return `${this.apiUrl}/${endpoint}?${query}`;
    }

    getShots(params = {}) {
        console.log(params);
        const apiUrl = this.buildUrl('shots', params);

        console.log(apiUrl);
        return new Promise(((resolve) => {
            needle
                .get(apiUrl, (error, response) => {
                    if (!error && response.statusCode === 200) {
                        console.log(response.body);
                        resolve(response.body);
                    }
                });
        }));
    }
}

export default Dribbble;

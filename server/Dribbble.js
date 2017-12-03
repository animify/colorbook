import needle from 'needle';
import querystring from 'querystring';

import Helpers from './common/helpers';

class Dribbble {
    constructor(db) {
        this.apiUrl = 'https://api.dribbble.com/v1';
        this.config = Helpers.config;
        this.db = db;
    }

    buildUrl(endpoint, queryObject) {
        console.log(this.config);
        const tokenedObject = Object.assign(queryObject, {
            access_token: this.config.keys.dribbble_token
        });

        const query = querystring.stringify(tokenedObject);
        return `${this.apiUrl}/${endpoint}?${query}`;
    }

    saveData() {
        console.log('saving data');
        ['2017-11-30', '2017-12-01'].forEach((date) => {
            console.log(date);
            this.saveShotsByDate(date);
        });
    }

    saveShotsByDate(date) {
        this.getShots({
            date
        }).then((shots) => {
            this.db.shots.set(date, shots).write();
        });
    }

    getShots(params = {}) {
        console.log(params);
        const apiUrl = this.buildUrl('shots', params);

        console.log(apiUrl);
        return new Promise(((resolve) => {
            needle
                .get(apiUrl, (error, response) => {
                    if (!error && response.statusCode === 200) {
                        resolve(response.body);
                    }
                });
        }));
    }
}

export default Dribbble;

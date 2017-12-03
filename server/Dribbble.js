import needle from 'needle';
import querystring from 'querystring';

import Helpers from './common/helpers';
import Extractor from './Extractor';

class Dribbble {
    constructor(db) {
        this.apiUrl = 'https://api.dribbble.com/v1';
        this.config = Helpers.config;
        this.db = db;
    }

    buildUrl(endpoint, queryObject) {
        const tokenedObject = Object.assign(queryObject, {
            access_token: this.config.keys.dribbble_token
        });

        const query = querystring.stringify(tokenedObject);
        return `${this.apiUrl}/${endpoint}?${query}`;
    }

    saveShotsByDate(date) {
        return new Promise((resolve, reject) => {
            this.getShots({ date })
                .then((shots) => {
                    Extractor.extractShots(shots)
                        .then((extractedShots) => {
                            const datedShots = {
                                shots: extractedShots,
                                date
                            };

                            this.db.shots
                                .set(date, datedShots)
                                .write();

                            resolve(datedShots);
                        })
                        .catch((errObject) => {
                            reject(errObject);
                        });
                });
        });
    }

    savePopularShots() {
        return new Promise((resolve, reject) => {
            this.getShots()
                .then((shots) => {
                    Extractor.extractShots(shots)
                        .then((extractedShots) => {
                            const popularShots = {
                                shots: extractedShots,
                                date: new Date()
                            };

                            this.db.shots
                                .set('popular', popularShots)
                                .write();

                            resolve(popularShots);
                        })
                        .catch((errObject) => {
                            reject(errObject);
                        });
                });
        });
    }

    getShots(params = {}) {
        const apiUrl = this.buildUrl('shots', params);

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

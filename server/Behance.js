import needle from 'needle';
import moment from 'moment';
import querystring from 'querystring';
import Helpers from './common/helpers';
import Extractor from './Extractor';

class Behance {
    constructor(db) {
        this.apiUrl = 'https://api.behance.net/v2';
        this.config = Helpers.config;
        this.db = db;
    }

    buildUrl(endpoint, queryObject) {
        const tokenedObject = Object.assign(queryObject, {
            client_id: this.config.keys.behance_token,
        });

        const query = querystring.stringify(tokenedObject);
        return `${this.apiUrl}/${endpoint}?${query}`;
    }

    saveProjects(param, value) {
        return new Promise((resolve, reject) => {
            this.getProjects({ [param]: value }).then(projects => {
                Extractor.extractProjects(projects)
                    .then(extractedProjects => {
                        const datedProjects = {
                            projects: extractedProjects,
                            date: moment(),
                        };

                        this.db.projects.set(`${param}:${value}`, datedProjects).write();

                        resolve(datedProjects);
                    })
                    .catch(errObject => {
                        reject(errObject);
                    });
            });
        });
    }

    getProjects(params = {}) {
        const apiUrl = this.buildUrl('projects', params);

        return new Promise(resolve => {
            needle.get(apiUrl, (error, response) => {
                if (!error && response.statusCode === 200) {
                    resolve(response.body.projects);
                }
            });
        });
    }
}

export default Behance;

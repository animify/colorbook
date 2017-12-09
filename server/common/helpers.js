import yaml from 'js-yaml';
import fs from 'fs';
import moment from 'moment';

class Helpers {
    static get url() {
        return 'https://colorbook.me';
    }

    static get config() {
        return yaml.safeLoad(fs.readFileSync('./server/configs/config.yml', 'utf8'));
    }

    static get serverConfig() {
        return yaml.safeLoad(fs.readFileSync('./server/configs/server-config.yml', 'utf8'));
    }

    static buildError(status, message) {
        return {
            success: false,
            status,
            message
        };
    }

    static lessThanOneHourAgo(date) {
        return moment(date).isBefore(moment().subtract(1, 'hours'));
    }
}

export default Helpers;

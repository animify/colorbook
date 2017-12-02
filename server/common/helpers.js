import yaml from 'js-yaml';
import fs from 'fs';

class Helpers {
    static get config() {
        return yaml.safeLoad(fs.readFileSync('./server/configs/config.yml', 'utf8'));
    }
}

export default Helpers;

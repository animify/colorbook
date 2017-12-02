const getColors = require('get-image-colors');

class Extractor {
    static extract(filepath) {
        return new Promise(((resolve) => {
            getColors(filepath).then((colors) => {
                resolve(colors);
            });
        }));
    }
}

export default Extractor;

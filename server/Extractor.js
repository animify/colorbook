const getColors = require('get-image-colors');

class Extractor {
    static extractColor(filepath) {
        return new Promise(((resolve) => {
            getColors(filepath).then((colors) => {
                resolve(colors);
            });
        }));
    }

    static extractData(shot) {
        console.log(shot);

        const normalizedData = {
            id: shot.id,
            title: shot.title,
            url: shot.html_url,
            imageUrl: shot.images.normal,
            colors: []
        };

        return new Promise(((resolve) => {
            Extractor.extractColor(normalizedData.imageUrl)
                .then((colors) => {
                    normalizedData.colors = colors.map(color => color.hex());
                    resolve(normalizedData);
                });
        }));
    }
}

export default Extractor;

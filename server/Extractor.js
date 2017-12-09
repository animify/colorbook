import getColors from 'get-image-colors';
import Helpers from './common/helpers';

class Extractor {
    static extractColor(filepath) {
        return new Promise(((resolve, reject) => {
            getColors(filepath)
                .then((colors) => {
                    resolve(colors);
                })
                .catch((err) => {
                    reject(Helpers.buildError(400, `Error retreiving colors on image. Details: ${err}`));
                });
        }));
    }

    static extractShots(shots) {
        const shotsData = shots.map(shot => Extractor.extractData(shot));
        return Promise.all(shotsData);
    }

    static extractData(shot) {
        const normalizedData = {
            id: shot.id,
            title: shot.title,
            url: shot.html_url,
            imageUrl: shot.images.normal,
            imageUrlHidpi: shot.images.hidpi || shot.images.normal,
            user_name: shot.user.username,
            user_pro: shot.user.pro,
            user_url: shot.user.html_url,
            user_avatar: shot.user.avatar_url,
            colors: []
        };

        return new Promise(((resolve, reject) => {
            Extractor.extractColor(normalizedData.imageUrlHidpi)
                .then((colors) => {
                    normalizedData.colors = colors.map(color => color.hex());
                    resolve(normalizedData);
                })
                .catch((err) => {
                    reject(Helpers.buildError(400, `Error extracting data from shot. Details: ${err}`));
                });
        }));
    }
}

export default Extractor;

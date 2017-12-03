import Helpers from './common/helpers';
import Extractor from './Extractor';

class Endpoint {
    constructor(db, dribbble) {
        this.db = db;
        this.dribbble = dribbble;
    }

    getPopularShots() {
        return new Promise((resolve, reject) => {
            const popularShots = this.db.shots.get('popular');
            const shotsLength = popularShots.size().value();
            console.log(popularShots, shotsLength);

            if (shotsLength === 0) {
                this.dribbble
                    .savePopularShots()
                    .then((shots) => {
                        resolve(shots);
                    });
            } else {
                resolve(popularShots);
            }
        });
    }

    getAllDateShots() {

    }

    getDateShots(date) {

    }
}

export default Endpoint;

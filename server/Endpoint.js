import Helpers from './common/helpers';

class Endpoint {
    constructor(db, dribbble) {
        this.db = db;
        this.dribbble = dribbble;
    }

    getPopularShots() {
        return new Promise((resolve, reject) => {
            const popularShots = this.db.shots.get('popular');
            const shotsLength = popularShots.size().value();
            const shouldResave = shotsLength === 0 || popularShots.value() === undefined || Helpers.lessThanOneHourAgo(popularShots.value().date);

            if (shouldResave) {
                this.dribbble
                    .savePopularShots()
                    .then((shots) => {
                        resolve({
                            success: true,
                            content: shots
                        });
                    })
                    .catch((errObject) => {
                        reject(errObject);
                    });
            } else {
                resolve({
                    success: true,
                    content: popularShots
                });
            }
        });
    }

    getShotsByDate(date) {
        return new Promise((resolve, reject) => {
            const datedShots = this.db.shots.get(date);
            const shotsLength = datedShots.size().value();
            const shouldResave = shotsLength === 0 || datedShots.value() === undefined || datedShots.value().shots.length === 0;

            if (shouldResave) {
                this.dribbble
                    .saveShotsByDate(date)
                    .then((shots) => {
                        resolve({
                            success: true,
                            content: shots
                        });
                    })
                    .catch((errObject) => {
                        reject(errObject);
                    });
            } else {
                resolve({
                    success: true,
                    content: datedShots
                });
            }
        });
    }

    getShotById(id) {
        return new Promise((resolve, reject) => {
            const dbValue = this.db.shots.value();
            const shotId = Number(id);

            if (!isNaN(shotId)) {
                const displayShot = Object.keys(dbValue).map((key) => {
                    const shots = dbValue[key].shots;
                    const foundShot = shots.find(shot => shot.id === shotId);
                    return foundShot;
                }).find(shot => shot !== undefined);

                if (displayShot) {
                    resolve({
                        success: true,
                        content: displayShot
                    });
                } else {
                    reject(Helpers.buildError(404, 'Shoot! Shot could not be found.'));
                }
            } else {
                reject(Helpers.buildError(400, 'Oh no, shot ids can not be strings!'));
            }
        });
    }
}

export default Endpoint;

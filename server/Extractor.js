import tinycolor from 'tinycolor2';
import getColors from 'get-image-colors';

export default class Extractor {
    static extractProjects(projects) {
        const projectsData = projects.map(project => Extractor.mapData(project));
        return Promise.all(projectsData);
    }

    static mapData(project) {
        const normalizedData = {
            id: project.id,
            title: project.name,
            url: project.url,
            imageUrl: project.covers[404],
            imageUrlHidpi: project.covers.original || project.covers[404],
            owners: project.owners.map(owner => ({
                first_name: owner.first_name,
                last_name: owner.last_name,
                username: owner.username,
                display_name: owner.display_name,
                location: owner.location,
                profile: owner.url,
            })),
        };

        return new Promise((resolve, reject) => {
            Extractor.extractColors(normalizedData.imageUrl)
                .then(colors => {
                    normalizedData.colors = colors.map(color => color.hex());
                    resolve(normalizedData);
                })
                .catch(err => {
                    reject(400, `Error extracting data from shot. Details: ${err}`);
                });
        });
    }

    static extractColors(url) {
        return new Promise((resolve, reject) => {
            getColors(url)
                .then(colors => {
                    resolve(colors);
                })
                .catch(err => {
                    reject(400, `Error retreiving colors on image. Details: ${err}`);
                });
        });
    }
}

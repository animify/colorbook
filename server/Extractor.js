import tinycolor from 'tinycolor2';

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
            colors: project.colors.map(color => tinycolor(color).toHexString())
        };

        return normalizedData;
    }
}

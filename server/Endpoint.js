import Helpers from './common/helpers';

class Endpoint {
    constructor(db, behance) {
        this.db = db;
        this.behance = behance;
    }

    getProjects(param, value) {
        return new Promise((resolve, reject) => {
            const datedProjects = this.db.projects.get(`${param}:${value}`);
            const projectsLength = datedProjects.size().value();
            const projectsValue = datedProjects.value() ? datedProjects.value().projects : [];
            const shouldResave = projectsLength === 0 || projectsValue === undefined || projectsValue.length === 0 || Helpers.lessThanOneDayAgo(datedProjects.value().date);

            if (shouldResave) {
                this.behance
                    .saveProjects(param, value)
                    .then((projects) => {
                        resolve({
                            success: true,
                            content: projects
                        });
                    })
                    .catch((errObject) => {
                        reject(errObject);
                    });
            } else {
                resolve({
                    success: true,
                    content: datedProjects
                });
            }
        });
    }

    getProjectById(id) {
        return new Promise((resolve, reject) => {
            const dbValue = this.db.projects.value();
            const projectId = Number(id);

            if (!isNaN(projectId)) {
                const displayProject = Object.keys(dbValue).map((key) => {
                    const projects = dbValue[key].projects;
                    const foundProject = projects.find(project => project.id === projectId);
                    return foundProject;
                }).find(project => project !== undefined);

                if (displayProject) {
                    resolve({
                        success: true,
                        content: displayProject
                    });
                } else {
                    reject(Helpers.buildError(404, 'Shoot! Project could not be found.'));
                }
            } else {
                reject(Helpers.buildError(400, 'Oh no, project ids can not be strings!'));
            }
        });
    }
}

export default Endpoint;

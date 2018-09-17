import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

class Db {
    constructor() {
        this.projects = this.loadShotsDb();
    }

    loadShotsDb() {
        const adapter = new FileSync('./server/database/projects.json');
        const db = low(adapter);

        return db;
    }
}

export default Db;

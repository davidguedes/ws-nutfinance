

import processClosings from './ClosingCron';
import processFixedEntries from './FixedCron';

class ManagerCron {
    private jobs: { start: () => void }[];

    constructor() {
        this.jobs = [processClosings, processFixedEntries];
    }

    run() {
        console.log('Iniciando jobs cron...');
        this.jobs.forEach((job) => job.start());
    }
}

export default new ManagerCron();
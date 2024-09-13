

import processClosings from './ClosingCron';
import processFixedEntries from './FixedCron';

class ManagerCron {
    jobs: any[];

    constructor() {
        this.jobs = [processClosings, processFixedEntries];
    }

    run() {
        this.jobs.forEach((job) => job.start());
    }

    stop() {
        this.jobs.forEach((job) => job.stop());
    }
}

export default new ManagerCron();
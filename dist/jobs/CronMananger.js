"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManagerCron {
    jobs;
    constructor() {
        //this.jobs = [processClosings, processFixedEntries];
        //this.jobs = [processClosings];
        this.jobs = [];
    }
    run() {
        this.jobs.forEach((job) => job.start());
    }
    stop() {
        this.jobs.forEach((job) => job.stop());
    }
}
exports.default = new ManagerCron();
//# sourceMappingURL=CronMananger.js.map
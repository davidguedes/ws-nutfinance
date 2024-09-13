"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClosingCron_1 = __importDefault(require("./ClosingCron"));
const FixedCron_1 = __importDefault(require("./FixedCron"));
class ManagerCron {
    jobs;
    constructor() {
        this.jobs = [ClosingCron_1.default, FixedCron_1.default];
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
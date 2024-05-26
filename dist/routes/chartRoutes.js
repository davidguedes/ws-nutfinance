"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChartController_1 = __importDefault(require("../controllers/ChartController"));
const router = express_1.default.Router();
router.get('/fixed', ChartController_1.default.getFixed);
router.get('/profit', ChartController_1.default.getProfit);
router.get('/comparative', ChartController_1.default.getComparative);
exports.default = router;

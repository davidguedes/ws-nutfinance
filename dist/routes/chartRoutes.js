"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChartnutController_1 = __importDefault(require("../controllers/ChartnutController"));
const router = express_1.default.Router();
router.get('/fixed', ChartnutController_1.default.getFixed);
router.get('/profit', ChartnutController_1.default.getProfit);
router.get('/expense', ChartnutController_1.default.getExpense);
router.get('/comparative', ChartnutController_1.default.getComparative);
router.get('/spendingCategory', ChartnutController_1.default.getSpendingCategory);
router.get('/progressOfMonth', ChartnutController_1.default.getProgressOfMonth);
exports.default = router;
//# sourceMappingURL=chartRoutes.js.map
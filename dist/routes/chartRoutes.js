"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChartnutController_1 = __importDefault(require("../controllers/ChartnutController"));
const auth_middleware_1 = require("../utils/auth.middleware");
const router = express_1.default.Router();
router.get('/fixed', auth_middleware_1.verifyToken, ChartnutController_1.default.getFixed);
router.get('/profit', auth_middleware_1.verifyToken, ChartnutController_1.default.getProfit);
router.get('/expense', auth_middleware_1.verifyToken, ChartnutController_1.default.getExpense);
router.get('/comparative', auth_middleware_1.verifyToken, ChartnutController_1.default.getComparative);
router.get('/spendingCategory', auth_middleware_1.verifyToken, ChartnutController_1.default.getSpendingCategory);
router.get('/progressOfMonth', auth_middleware_1.verifyToken, ChartnutController_1.default.getProgressOfMonth);
exports.default = router;
//# sourceMappingURL=chartRoutes.js.map
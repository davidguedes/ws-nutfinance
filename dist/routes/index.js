"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fixedRoutes_1 = __importDefault(require("./fixedRoutes"));
const chartRoutes_1 = __importDefault(require("./chartRoutes"));
const transactionRoutes_1 = __importDefault(require("./transactionRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const budgetRoutes_1 = __importDefault(require("./budgetRoutes"));
const router = express_1.default.Router();
router.use('/auth', authRoutes_1.default);
router.use('/budget', budgetRoutes_1.default);
router.use('/chart', chartRoutes_1.default);
router.use('/fixed', fixedRoutes_1.default);
router.use('/transaction', transactionRoutes_1.default);
router.use('/user', userRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
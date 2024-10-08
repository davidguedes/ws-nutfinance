"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BudgetController_1 = __importDefault(require("../controllers/BudgetController"));
const auth_middleware_1 = require("../utils/auth.middleware");
const router = express_1.default.Router();
// Definir rotas para posts
router.put('/', auth_middleware_1.verifyToken, BudgetController_1.default.update);
router.get('/:user_id', auth_middleware_1.verifyToken, BudgetController_1.default.getAll);
router.get('/getCategory/:user_id', auth_middleware_1.verifyToken, BudgetController_1.default.getCategory);
exports.default = router;
//# sourceMappingURL=budgetRoutes.js.map
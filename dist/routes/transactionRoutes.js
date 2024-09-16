"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const auth_middleware_1 = require("../utils/auth.middleware");
const router = express_1.default.Router();
// Definir rotas para posts
router.get('/', auth_middleware_1.verifyToken, TransactionController_1.default.getAll);
router.post('/', auth_middleware_1.verifyToken, TransactionController_1.default.create);
router.put('/', auth_middleware_1.verifyToken, TransactionController_1.default.update);
router.delete('/:id', auth_middleware_1.verifyToken, TransactionController_1.default.delete);
exports.default = router;
//# sourceMappingURL=transactionRoutes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const router = express_1.default.Router();
// Definir rotas para posts
router.get('/', TransactionController_1.default.getAll);
router.post('/', TransactionController_1.default.create);
router.put('/', TransactionController_1.default.update);
router.delete('/:id', TransactionController_1.default.delete);
exports.default = router;

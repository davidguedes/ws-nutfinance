"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const router = express_1.default.Router();
// Definir rotas para posts
router.get('/', CategoryController_1.default.getAll);
router.get('/byUser', CategoryController_1.default.getByUser);
router.post('/', CategoryController_1.default.create);
router.put('/', CategoryController_1.default.update);
router.delete('/:id', CategoryController_1.default.delete);
exports.default = router;

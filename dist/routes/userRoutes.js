"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
// Definir rotas para posts
router.get('/', UserController_1.default.getAll);
router.post('/', UserController_1.default.create);
router.put('/', UserController_1.default.update);
router.delete('/', UserController_1.default.delete);
exports.default = router;

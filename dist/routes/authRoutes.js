"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = express_1.default.Router();
// Definir rotas para posts
router.post('/login', AuthController_1.default.login);
router.post('/reset', AuthController_1.default.reset);
router.put('/update', AuthController_1.default.update);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
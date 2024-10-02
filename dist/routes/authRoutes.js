"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const auth_middleware_1 = require("../utils/auth.middleware");
const router = express_1.default.Router();
// Definir rotas para posts
router.post('/login', AuthController_1.default.login);
router.post('/reset', auth_middleware_1.verifyToken, AuthController_1.default.reset);
router.put('/update', auth_middleware_1.verifyToken, AuthController_1.default.update);
router.post('/refresh-token', AuthController_1.default.refreshToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClosureController_1 = __importDefault(require("../controllers/ClosureController"));
const auth_middleware_1 = require("../utils/auth.middleware");
const router = express_1.default.Router();
// Definir rotas para posts
router.get('/', auth_middleware_1.verifyToken, ClosureController_1.default.getAll);
exports.default = router;
//# sourceMappingURL=closureRoutes.js.map
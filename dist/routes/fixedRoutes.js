"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FixedController_1 = __importDefault(require("../controllers/FixedController"));
const router = express_1.default.Router();
// Definir rotas para posts
router.get('/', FixedController_1.default.getAll);
router.post('/', FixedController_1.default.create);
router.put('/', FixedController_1.default.update);
router.delete('/:id', FixedController_1.default.delete);
exports.default = router;
//# sourceMappingURL=fixedRoutes.js.map
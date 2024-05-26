"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Auth_1 = require("../models/Auth");
class AuthController {
    // GET /api/users
    async login(req, res) {
        const { email, password } = req.body;
        try {
            let { user, token } = await Auth_1.Auth.login(email, password);
            res.json({ user, token });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();

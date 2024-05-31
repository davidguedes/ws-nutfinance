"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Auth_1 = require("../models/Auth");
const Chartnut_1 = require("../models/Chartnut");
class AuthController {
    // GET /api/users
    async login(req, res) {
        const { email, password } = req.body;
        try {
            let { token, user } = await Auth_1.Auth.login(email, password);
            const fixed = await Chartnut_1.Chartnut.getFixed('null');
            console.log('O fixed ', fixed);
            res.json({ user, token });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartController = void 0;
const Auth_1 = require("../models/Auth");
class ChartController {
    async getFixed(req, res) {
        try {
            console.log('req.query. ', req.query);
            console.log('req.query. ', req.params);
            console.log('req.query. ', req.body);
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ error: 'user_id is required' });
                return;
            }
            const fixed = await Auth_1.Auth.getFixed(user_id);
            res.json(fixed);
        }
        catch (error) {
            console.error('Error in getFixed:', error);
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    async getProfit(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ error: 'user_id is required' });
                return;
            }
            const profit = await Auth_1.Auth.getProfit(user_id);
            res.json(profit);
        }
        catch (error) {
            console.error('Error in getProfit:', error);
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    async getComparative(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ error: 'user_id is required' });
                return;
            }
            const profit = await Auth_1.Auth.getComparative(user_id);
            res.json(profit);
        }
        catch (error) {
            console.error('Error in getComparative:', error);
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
}
exports.ChartController = ChartController;
exports.default = new ChartController();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartController = void 0;
const Chartnut_1 = require("../models/Chartnut");
class ChartController {
    async getFixed(req, res) {
        try {
            console.log('req.query. ', req.query);
            console.log('req.query. ', req.params);
            console.log('req.query. ', req.body);
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const fixed = await Chartnut_1.Chartnut.getFixed(user_id);
            res.json(fixed);
        }
        catch (error) {
            console.error('Error in getFixed:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
    async getProfit(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const profit = await Chartnut_1.Chartnut.getProfit(user_id);
            res.json(profit);
        }
        catch (error) {
            console.error('Error in getProfit:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
    async getComparative(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const comparative = await Chartnut_1.Chartnut.getComparative(user_id);
            res.json(comparative);
        }
        catch (error) {
            console.error('Error in getComparative:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
    async getSpendingCategory(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const spendingCategory = await Chartnut_1.Chartnut.getSpendingCategory(user_id);
            res.json(spendingCategory);
        }
        catch (error) {
            console.error('Error in getSpendingCategory:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
}
exports.ChartController = ChartController;
exports.default = new ChartController();

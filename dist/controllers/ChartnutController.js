"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartController = void 0;
const ChartNut_1 = require("../models/ChartNut");
class ChartController {
    async getFixed(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const fixed = await ChartNut_1.Chartnut.getFixed(user_id);
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
            const profit = await ChartNut_1.Chartnut.getProfit(user_id);
            res.json(profit);
        }
        catch (error) {
            console.error('Error in getProfit:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
    async getExpense(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const profit = await ChartNut_1.Chartnut.getExpense(user_id);
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
            const comparative = await ChartNut_1.Chartnut.getComparative(user_id);
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
            const spendingCategory = await ChartNut_1.Chartnut.getSpendingCategory(user_id);
            res.json(spendingCategory);
        }
        catch (error) {
            console.error('Error in getSpendingCategory:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
    async getProgressOfMonth(req, res) {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }
            const progressOfMonth = await ChartNut_1.Chartnut.getProgressOfMonth(user_id);
            res.json(progressOfMonth);
        }
        catch (error) {
            console.error('Error in getProgressOfMonth:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
}
exports.ChartController = ChartController;
exports.default = new ChartController();
//# sourceMappingURL=ChartnutController.js.map
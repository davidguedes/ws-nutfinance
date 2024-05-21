"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartController = void 0;
//import { ChartNut } from '../models/ChartNut';
class ChartController {
    async getFixed(req, res) {
        try {
            let { userId } = req.query;
            console.log('req.query: ', req.query);
            let valueUserId = userId ? userId?.toString() : '';
            const fixed = 0; //await ChartNut.getFixed(valueUserId);
            res.json(fixed);
        }
        catch (error) {
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    async getProfit(req, res) {
        try {
            let { userId } = req.query;
            let valueUserId = userId ? userId?.toString() : '';
            const profit = 0; //await ChartNut.getProfit(valueUserId);
            res.json(profit);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.ChartController = ChartController;
exports.default = new ChartController();

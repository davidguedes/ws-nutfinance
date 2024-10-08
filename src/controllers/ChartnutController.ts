import { Request, Response } from 'express';
import { Chartnut } from '../models/ChartNut';

export class ChartController {
    public async getFixed(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const fixed = await Chartnut.getFixed(user_id);
            res.json(fixed);
        } catch (error) {
            console.error('Error in getFixed:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }

    public async getProfit(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const profit = await Chartnut.getProfit(user_id);
            res.json(profit);
        } catch (error) {
            console.error('Error in getProfit:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }

    public async getExpense(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const profit = await Chartnut.getExpense(user_id);
            res.json(profit);
        } catch (error) {
            console.error('Error in getProfit:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }

    public async getComparative(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const comparative = await Chartnut.getComparative(user_id);
            res.json(comparative);
        } catch (error) {
            console.error('Error in getComparative:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }

    public async getSpendingCategory(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const spendingCategory = await Chartnut.getSpendingCategory(user_id);
            res.json(spendingCategory);
        } catch (error) {
            console.error('Error in getSpendingCategory:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }

    public async getProgressOfMonth(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const progressOfMonth = await Chartnut.getProgressOfMonth(user_id);
            res.json(progressOfMonth);
        } catch (error) {
            console.error('Error in getProgressOfMonth:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
}

export default new ChartController();
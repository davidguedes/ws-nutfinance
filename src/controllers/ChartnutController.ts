import { Request, Response } from 'express';
import { Chartnut } from '../models/Chartnut';

export class ChartController {
    public async getFixed(req: Request, res: Response): Promise<void> {
        try {

            console.log('req.query. ', req.query)
            console.log('req.query. ', req.params)
            console.log('req.query. ', req.body)
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

    public async getComparative(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.query.user_id?.toString();
            if (!user_id) {
                res.status(400).json({ message: 'user_id is required' });
                return;
            }

            const profit = await Chartnut.getComparative(user_id);
            res.json(profit);
        } catch (error) {
            console.error('Error in getComparative:', error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }
}

export default new ChartController();
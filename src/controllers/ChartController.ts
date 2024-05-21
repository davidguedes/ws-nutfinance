import { Request, Response } from 'express';
import { Chart } from '../models/Chart';

export class ChartController {
    public async getFixed(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;

            console.log('req.query: ', req.query);
            let valueUserId: string = userId ? userId?.toString() : '';

            const fixed: number = await Chart.getFixed(valueUserId);
            res.json(fixed);
        } catch (error) {
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    public async getProfit(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;
            let valueUserId: string = userId ? userId?.toString() : '';

            const profit: number = await Chart.getProfit(valueUserId);

            res.json(profit);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ChartController();
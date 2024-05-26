import { Request, Response } from 'express';
import { Chartnut } from '../models/Chartnut';

export class ChartController {
    public async getFixed(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;

            console.log('req.query: ', req.query);
            let valueUserId: string = userId ? userId?.toString() : '';

            const fixed: number = await Chartnut.getFixed(valueUserId);
            res.json(fixed);
        } catch (error) {
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    public async getProfit(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;
            let valueUserId: string = userId ? userId?.toString() : '';

            const profit: number = await Chartnut.getProfit(valueUserId);

            res.json(profit);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getComparative(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;
            let valueUserId: string = userId ? userId?.toString() : '';

            const profit: any[] = await Chartnut.getComparative(valueUserId);

            res.json(profit);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ChartController();
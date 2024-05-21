import { Request, Response } from 'express';
//import { ChartNut } from '../models/ChartNut';

export class ChartController {
    public async getFixed(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;

            console.log('req.query: ', req.query);
            let valueUserId: string = userId ? userId?.toString() : '';

            const fixed: number = 0 //await ChartNut.getFixed(valueUserId);
            res.json(fixed);
        } catch (error) {
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    public async getProfit(req: Request, res: Response): Promise<void> {
        try {
            let { userId } = req.query;
            let valueUserId: string = userId ? userId?.toString() : '';

            const profit: number = 0 //await ChartNut.getProfit(valueUserId);

            res.json(profit);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ChartController();
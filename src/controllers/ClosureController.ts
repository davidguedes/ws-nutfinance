import { Request, Response } from 'express';
import { Closure } from '../models/Closure';

export class ClosureController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let { user_id, first, rows, initial_date, final_date } = req.query;

            if(!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }

            let value_user_id = user_id.toString();
            let valueFirst: number = first ? Number(first) : 0;
            let valueRows: number = rows ? Number(rows) : 0;
            let value_initial_date: Date | null = initial_date ? new Date(initial_date as string) : null;
            let value_final_date: Date | null = final_date ? new Date(final_date as string) : null;


            const data = await Closure.findAll(value_user_id, valueFirst, valueRows, value_initial_date, value_final_date);
            res.json({totalRecords: data.totalRecords, records: data.records});
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

export default new ClosureController();
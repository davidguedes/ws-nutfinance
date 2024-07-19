import { Request, Response } from 'express';
import { Fixed } from '../models/Fixed';

export class FixedController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let { user_id, first, rows, description, day_inclusion, tags, status, type, sort } = req.query;

            if(!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }

            let value_user_id = user_id.toString();
            let valueFirst: number = first ? Number(first) : 0;
            let valueRows: number = rows ? Number(rows) : 0;
            let value_description: string | null = description ? description as string : null;
            let value_day_inclusion: number | null = day_inclusion ? Number(day_inclusion) : null;
            let valueTags: string[] | null = tags ? (tags as string).split(',') : null;
            let valueStatus = status === 'false' ? false : true;
            let valueType = type === 'true' ? 'R' : type === 'false' ? 'D' : null;
            let valueSort = sort === 'false' ? false : true;

            const data = await Fixed.findAll(value_user_id, valueFirst, valueRows, value_description, value_day_inclusion, valueTags, valueStatus, valueType, valueSort);
            res.json({totalRecords: data.totalRecords, records: data.records});
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const transactionId = req.params.id;
        try {
            const transaction = await Fixed.findById(transactionId);
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.body);
            const { value, type, day_inclusion, description, tags, user_id } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const newFixed = await Fixed.create({
                value,
                type,
                day_inclusion,
                description,
                tags,
                user_id: user_id
            });

            res.status(201).json(newFixed);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar fixa:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const user_id = req.params.id;
        try {
            const { id, value, type, day_inclusion, description, tags, user_id } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const updatedFixed = await Fixed.update({
                id,
                value,
                type,
                day_inclusion,
                description,
                tags,
                user_id: user_id
            });

            // Retornar a transação criada como resposta
            res.status(200).json(updatedFixed);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar fixa:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.params);
            const { id } = req.params;

            // Criar a transação utilizando o método estático create do modelo
            await Fixed.delete({
                id
            });

            //console.log('deletedTransaction: ', deletedTransaction);
            // Retornar a transação criada como resposta
            res.status(200).json(true);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao deletar fixa:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default new FixedController();
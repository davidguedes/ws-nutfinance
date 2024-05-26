import { Request, Response } from 'express';
import { Auth } from '../models/Auth';

export class AuthController {
    // GET /api/users
    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            let {user, token} = await Auth.login(email, password);
            
            res.json({user, token});
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AuthController();
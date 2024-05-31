import { Request, Response } from 'express';
import { Auth } from '../models/Auth';
import { Chartnut } from '../models/Chartnut';

export class AuthController {
    // GET /api/users
    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            let { token, user} = await Auth.login(email, password);
            
            const fixed = await Chartnut.getFixed('null');
            console.log('O fixed ', fixed);

            res.json({user, token});
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AuthController();
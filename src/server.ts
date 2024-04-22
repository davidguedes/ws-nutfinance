import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
    res.send('Olá, mundo!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

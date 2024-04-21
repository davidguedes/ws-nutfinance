import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
    res.send('Olá, mundo!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

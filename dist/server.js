"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [process.env.HOST || 'http://localhost:4200'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use('/api', index_1.default);
// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

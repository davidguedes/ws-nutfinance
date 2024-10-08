"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chartnut = void 0;
const prisma_1 = require("../lib/prisma");
const cryptoUtils_1 = require("../utils/cryptoUtils"); // Importa as funções de criptografia
class Chartnut {
    static async getFixed(user_id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: user_id } });
            if (!user)
                throw new Error(`User not found`);
            const now = new Date();
            const closingDate = user.closingDate;
            // Determinar o início e o fim do período atual
            let startOfPeriod, endOfPeriod;
            if (now.getDate() >= closingDate) {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, closingDate, 23, 59, 59);
            }
            else {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 1, closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate - 1, 23, 59, 59);
            }
            const startOfMonthLocal = new Date(startOfPeriod.getTime() - startOfPeriod.getTimezoneOffset() * 60000);
            const endOfMonthLocal = new Date(endOfPeriod.getTime() - endOfPeriod.getTimezoneOffset() * 60000);
            const filter = {
                user_id: user_id,
                date_transaction: {
                    gte: startOfMonthLocal,
                    lte: endOfMonthLocal
                }
            };
            const fixed = await prisma_1.prisma.transaction.count({
                where: filter
            });
            return fixed;
        }
        catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    static async getProfit(user_id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: user_id } });
            if (!user)
                throw new Error(`User not found`);
            // Obter a data atual
            const now = new Date();
            const closingDate = user.closingDate;
            // Determinar o início e o fim do período atual
            let startOfPeriod, endOfPeriod;
            if (now.getDate() >= closingDate) {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, closingDate, 23, 59, 59);
            }
            else {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 1, closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate - 1, 23, 59, 59);
            }
            const startOfMonthLocal = new Date(startOfPeriod.getTime() - startOfPeriod.getTimezoneOffset() * 60000);
            const endOfMonthLocal = new Date(endOfPeriod.getTime() - endOfPeriod.getTimezoneOffset() * 60000);
            let filter = {
                user_id: user_id,
                type: 'R',
                date_transaction: {
                    gte: startOfMonthLocal,
                    lte: endOfMonthLocal
                }
            };
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
            // Desencriptar e converter valores para número
            const profit = transactions.reduce((sum, transaction) => {
                const decryptedValue = (0, cryptoUtils_1.decrypt)(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return sum + numericValue;
            }, 0);
            return profit;
        }
        catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    static async getExpense(user_id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: user_id } });
            if (!user)
                throw new Error(`User not found`);
            // Obter a data atual
            const now = new Date();
            const closingDate = user.closingDate;
            // Determinar o início e o fim do período atual
            let startOfPeriod, endOfPeriod;
            if (now.getDate() >= closingDate) {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, closingDate, 23, 59, 59);
            }
            else {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 1, closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate - 1, 23, 59, 59);
            }
            const startOfMonthLocal = new Date(startOfPeriod.getTime() - startOfPeriod.getTimezoneOffset() * 60000);
            const endOfMonthLocal = new Date(endOfPeriod.getTime() - endOfPeriod.getTimezoneOffset() * 60000);
            let filter = {
                user_id: user_id,
                type: 'D',
                date_transaction: {
                    gte: startOfMonthLocal,
                    lte: endOfMonthLocal
                }
            };
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
            // Desencriptar e converter valores para número
            const profit = transactions.reduce((sum, transaction) => {
                const decryptedValue = (0, cryptoUtils_1.decrypt)(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return sum + numericValue;
            }, 0);
            return profit;
        }
        catch (err) {
            console.error('Error in getExpense: ', err);
            return 0;
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    static async getComparative(user_id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: user_id } });
            if (!user)
                throw new Error(`User not found`);
            const today = new Date();
            const closingDate = user.closingDate;
            // Ajustando para pegar os últimos 6 meses
            const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, closingDate, 0, 0, 0);
            // Remove o timezone offset
            const adjustedStartDate = new Date(sixMonthsAgo.getTime() - sixMonthsAgo.getTimezoneOffset() * 60000);
            let filter = {
                user_id: user_id,
                createdAt: {
                    gte: adjustedStartDate, // Considera os últimos 6 meses
                },
            };
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: filter,
            });
            const groupedTransactions = transactions.reduce((acc, transaction) => {
                const transactionDate = new Date(transaction.date_transaction);
                // Calcular o início do período
                let startOfPeriod = new Date(transactionDate.getFullYear(), transactionDate.getMonth(), closingDate, 0, 0, 0);
                // Ajustar para o período correto se a transação for antes do fechamento
                if (transactionDate < startOfPeriod) {
                    startOfPeriod.setMonth(startOfPeriod.getMonth() - 1);
                }
                // Remove o timezone
                const startOfPeriodLocal = new Date(startOfPeriod.getTime() - startOfPeriod.getTimezoneOffset() * 60000);
                // Calcular o fim do período (próximo mês na mesma data, até o final do dia)
                const endOfPeriod = new Date(startOfPeriodLocal.getFullYear(), startOfPeriodLocal.getMonth() + 1, closingDate, 23, 59, 59);
                // Criar uma chave única para cada período
                const periodKey = `${startOfPeriodLocal.getDate()}${startOfPeriodLocal.getMonth() + 1}${startOfPeriodLocal.getFullYear()}`;
                const periodTitle = `${startOfPeriodLocal.toLocaleDateString()} - ${endOfPeriod.toLocaleDateString()}`;
                if (!acc[periodKey]) {
                    acc[periodKey] = { D: 0, R: 0, title: periodTitle };
                }
                // Acumular os valores
                acc[periodKey][transaction.type] += Number((0, cryptoUtils_1.decrypt)(transaction.value));
                return acc;
            }, {});
            const valores = Object.keys(groupedTransactions).map((key) => ({
                type: 'D',
                value: groupedTransactions[key].D,
                ref: key,
            })).concat(Object.keys(groupedTransactions).map((key) => ({
                type: 'R',
                value: groupedTransactions[key].R,
                ref: key,
            })));
            const meses = Object.keys(groupedTransactions).map((key) => ({
                title: groupedTransactions[key].title,
                ref: key,
            }));
            return { valores, meses };
        }
        catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    static async getSpendingCategory(user_id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: user_id } });
            if (!user)
                throw new Error(`User not found`);
            // Obter a data atual
            const now = new Date();
            const closingDate = user.closingDate;
            // Determinar o início e o fim do período atual
            let startOfPeriod, endOfPeriod;
            if (now.getDate() >= closingDate) {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, closingDate, 23, 59, 59);
            }
            else {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 1, closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate - 1, 23, 59, 59);
            }
            const startOfMonthLocal = new Date(startOfPeriod.getTime() - startOfPeriod.getTimezoneOffset() * 60000);
            const endOfMonthLocal = new Date(endOfPeriod.getTime() - endOfPeriod.getTimezoneOffset() * 60000);
            let filter = {
                user_id: user_id,
                type: 'D',
                date_transaction: {
                    gte: startOfMonthLocal,
                    lte: endOfMonthLocal
                }
            };
            // Recuperando dados do banco
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: filter,
                include: {
                    budgetCategory: true,
                }
            });
            // Agrupando e somando os valores por categoria
            const results = transactions.reduce((acc, transaction) => {
                const categoria = transaction.budgetCategory ? transaction.budgetCategory.category : 'Sem categoria';
                const valor = Number((0, cryptoUtils_1.decrypt)(transaction.value));
                const cor = transaction.budgetCategory ? transaction.budgetCategory.color : null;
                if (!acc[categoria]) {
                    acc[categoria] = { total: 0, cor: cor };
                }
                acc[categoria].total += valor;
                return acc;
            }, {});
            // Convertendo o resultado em um array para facilitar a manipulação
            const resultArray = Object.keys(results).map(categoria => ({
                categoria,
                total_valor: results[categoria].total,
                cor: results[categoria].cor
            }));
            // Ordenando por total_valor descendente
            resultArray.sort((a, b) => b.total_valor - a.total_valor);
            let finalResult = {
                labels: [],
                datasets: []
            };
            let finalDataset = {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            };
            resultArray.map((val, index) => {
                finalResult.labels.push(val.categoria);
                finalDataset.data.push(val.total_valor);
                // Aplicando cores de forma cíclica
                finalDataset.backgroundColor.push(val.cor ? val.cor : backgroundColors[index % backgroundColors.length]);
                finalDataset.hoverBackgroundColor.push(val.cor ? shadeColor(val.cor, 0.2) : hoverBackgroundColors[index % hoverBackgroundColors.length]);
            });
            finalResult.datasets.push(finalDataset);
            return finalResult;
        }
        catch (err) {
            console.error('Error in getFixed: ', err);
            return {};
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    static async getProgressOfMonth(user_id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id: user_id } });
            if (!user)
                throw new Error('User not found');
            let filter = {
                user_id
            };
            // Recuperando dados do banco
            const budget = await prisma_1.prisma.budget.findFirst({
                where: filter
            });
            console.log('budget: ', budget);
            let filterCategory = {
                budget_id: budget?.id
            };
            // Recuperando dados do banco
            const budgetCategory = await prisma_1.prisma.budgetCategory.findMany({
                where: filterCategory
            });
            const now = new Date();
            const closingDate = user.closingDate;
            // Determinar o início e o fim do período atual
            let startOfPeriod, endOfPeriod;
            if (now.getDate() >= closingDate) {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, closingDate, 23, 59, 59);
            }
            else {
                startOfPeriod = new Date(now.getFullYear(), now.getMonth() - 1, closingDate, 0, 0, 0);
                endOfPeriod = new Date(now.getFullYear(), now.getMonth(), closingDate - 1, 23, 59, 59);
            }
            const startOfMonthLocal = new Date(startOfPeriod.getTime() - startOfPeriod.getTimezoneOffset() * 60000);
            const endOfMonthLocal = new Date(endOfPeriod.getTime() - endOfPeriod.getTimezoneOffset() * 60000);
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: {
                    user_id: user.id,
                    date_transaction: {
                        gte: startOfMonthLocal,
                        lte: endOfMonthLocal,
                    },
                },
                include: {
                    budgetCategory: true,
                },
            });
            let processedValues = processTransactionData(transactions, budgetCategory);
            return processedValues;
        }
        catch (err) {
            console.error('Error in getProgressOfMonth: ', err);
            return {};
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
}
exports.Chartnut = Chartnut;
function processTransactionData(transactions, budgetCategories) {
    let categoryData = {};
    // Inicializar os dados das categorias
    budgetCategories.forEach((category) => {
        categoryData[category.id] = {
            name: category.category,
            type: category.type,
            predictedAmount: category.amount,
            actualAmount: 0,
        };
    });
    // Somar os valores das transações por categoria
    transactions.forEach((transaction) => {
        const category = transaction.budgetCategory;
        if (category) {
            categoryData[category.id].actualAmount += parseFloat((0, cryptoUtils_1.decrypt)(transaction.value));
        }
    });
    categoryData = Object.fromEntries(Object.entries(categoryData).filter(([key, value]) => value.actualAmount !== 0));
    return Object.values(categoryData);
}
// Função para gerar uma cor hexadecimal aleatória
function getRandomColor() {
    // Gera um número aleatório e converte para hexadecimal, cortando o '0x' inicial
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
// Gerar uma lista de cores aleatórias
function generateColorList(numColors) {
    const colorList = [];
    for (let i = 0; i < numColors; i++) {
        colorList.push(getRandomColor());
    }
    return colorList;
}
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    R = Math.floor(R * (1 - percent));
    G = Math.floor(G * (1 - percent));
    B = Math.floor(B * (1 - percent));
    const newColor = `#${(R.toString(16).padStart(2, '0'))}${(G.toString(16).padStart(2, '0'))}${(B.toString(16).padStart(2, '0'))}`;
    return newColor;
}
const backgroundColors = [
    '#3498db', '#f1c40f', '#2ecc71', '#e74c3c', '#9b59b6', '#34495e', '#1abc9c', '#e67e22', '#ecf0f1', '#95a5a6',
    '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085',
    '#2ecc71', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad',
    '#2980b9', '#27ae60', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c',
    '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60',
    '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e',
    '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#f39c12', '#d35400',
    '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f', '#e67e22',
    '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#f39c12', '#d35400', '#c0392b', '#bdc3c7',
    '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6'
];
const hoverBackgroundColors = [
    '#2980b9', '#f39c12', '#27ae60', '#c0392b', '#8e44ad', '#2c3e50', '#16a085', '#d35400', '#bdc3c7', '#7f8c8d',
    '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085',
    '#2ecc71', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad',
    '#2980b9', '#27ae60', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c',
    '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60',
    '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e',
    '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#f39c12', '#d35400',
    '#c0392b', '#bdc3c7', '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f', '#e67e22',
    '#ecf0f1', '#95a5a6', '#2c3e50', '#8e44ad', '#2980b9', '#27ae60', '#f39c12', '#d35400', '#c0392b', '#bdc3c7',
    '#7f8c8d', '#16a085', '#1abc9c', '#e74c3c', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#ecf0f1', '#95a5a6'
];
//# sourceMappingURL=ChartNut.js.map
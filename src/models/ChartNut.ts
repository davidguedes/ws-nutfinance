import { Prisma } from '@prisma/client';
import { prisma } from "../lib/prisma";
import { encrypt, decrypt } from '../utils/cryptoUtils'; // Importa as funções de criptografia

interface PieChartData {
    labels: string[];
    datasets: Dataset[];
}

interface Dataset {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
}

export class Chartnut {

    public static async getFixed(user_id: string): Promise<number> {
        let filter: Prisma.TransactionWhereInput = {
            user_id: user_id
        };
 
        // Obter a data atual
         const today = new Date();
 
         // Primeiro dia do mês atual
         const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 
         // Último dia do mês atual
         const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 
         filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
 
        try {
            const fixed = await prisma.transaction.count({
                where: filter
            });

            return fixed;
        } catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        }
    }
 
    public static async getProfit(user_id: string): Promise<number> {
         let filter: Prisma.TransactionWhereInput = {
            user_id: user_id,
            type: 'R'
        };

        // Obter a data atual
         const today = new Date();
 
         // Primeiro dia do mês atual
         const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 
         // Último dia do mês atual
         const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
 
        try {
            const transactions = await prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });

    
            // Desencriptar e converter valores para número
            const profit = transactions.reduce((sum, transaction) => {
                const decryptedValue = decrypt(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return sum + numericValue;
            }, 0);
    
            return profit;
        } catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        }
    }

    public static async getComparative(user_id: string): Promise<any[]> {
        let filter: Prisma.TransactionWhereInput = {
            user_id: user_id
        };
 
        // Obter a data atual
        const today = new Date();
 
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
  
        try {
            const transactions = await prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
    
            // Desencriptar e converter valores para número
            const comparative = transactions.map(transaction => {
                const decryptedValue = decrypt(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return numericValue;
            });
    
            return comparative;
        } catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
        }
    }

    public static async getSpendingCategory(user_id: string): Promise<any> {
        let filter: Prisma.TransactionWhereInput = {
            user_id: user_id
        };
    
        // Obter a data atual
            const today = new Date();
    
            // Primeiro dia do mês atual
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
            // Último dia do mês atual
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
            filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
        
            try {
            // Recuperando dados do banco
            const transactions  = await prisma.transaction.findMany({
                where: filter,
                include: {
                    category: true,
                }
            });

            // Agrupando e somando os valores por categoria
            const results = transactions.reduce((acc: any, transaction) => {
                const categoria = transaction.category ? transaction.category.name : 'Sem categoria';
                const valor: number = Number(decrypt(transaction.value));
                
                if (!acc[categoria]) {
                    acc[categoria] = 0;
                }
            
                acc[categoria] += valor;
                return acc;
            }, {});

            // Convertendo o resultado em um array para facilitar a manipulação
            const resultArray = Object.keys(results).map(categoria => ({
                categoria,
                total_valor: results[categoria],
            }));
            
            // Ordenando por total_valor descendente
            resultArray.sort((a, b) => b.total_valor - a.total_valor);

            let finalResult: PieChartData = {
                labels: [],
                datasets: []
            };

            let finalDataset: Dataset = {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }; 
            
            resultArray.map((val, index) => {
                finalResult.labels.push(val.categoria);
                finalDataset.data.push(val.total_valor);

                // Aplicando cores de forma cíclica
                finalDataset.backgroundColor.push(
                    backgroundColors[index % backgroundColors.length]
                );
                finalDataset.hoverBackgroundColor.push(
                    hoverBackgroundColors[index % hoverBackgroundColors.length]
                );
            })

            finalResult.datasets.push(finalDataset);

            return finalResult;
        } catch (err) {
            console.error('Error in getFixed: ', err);
            return {} as PieChartData;
        }
    }
}

// Função para gerar uma cor hexadecimal aleatória
function getRandomColor(): string {
    // Gera um número aleatório e converte para hexadecimal, cortando o '0x' inicial
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Gerar uma lista de cores aleatórias
function generateColorList(numColors: number): string[] {
    const colorList: string[] = [];
    for (let i = 0; i < numColors; i++) {
        colorList.push(getRandomColor());
    }
    return colorList;
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
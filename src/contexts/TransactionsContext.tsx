import { createContext, ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../lib/axios";



interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
    
}

interface CreateTransactionInput {
    description: string,
    price: number;
    category: string;
    type: 'income' | 'outcome'
}

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createdTransactions: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}


export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
         params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query,
         }   
        })

        const sortedTransactions = response.data.sort(
            (a: Transaction, b: Transaction) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    
        setTransactions(sortedTransactions);

    }

    async function createdTransactions(data: CreateTransactionInput) {
        const { description, price, category, type } = data;
        
        const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
        })

        setTransactions(state => [response.data, ...state]);
    }
        

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ 
            transactions, 
            fetchTransactions,
            createdTransactions,
            }}>
            {children}
        </TransactionsContext.Provider> 
    )
}

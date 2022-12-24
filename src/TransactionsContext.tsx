import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
    id: number;
    title: string;
    value: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TnrasactionProviderProps {
    children: ReactNode;
}

export const TransactionContext = createContext<Transaction[]>([]);

export function TransactionsProvider({ children }: TnrasactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        api.get('http://localhost:3000/api/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []); 

    return (
        <TransactionContext.Provider value={transactions}>
            {children}
        </TransactionContext.Provider>
    )
}
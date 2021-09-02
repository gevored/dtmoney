import {createContext, ReactNode, useEffect, useState} from 'react'
import { api } from './services/api'


interface Transaction{
    id:number;
    title:string;
    amount:number;
    type:string;
    category:string;
    createdAt: string;
}

interface TransactionInput{
    
    title:string;
    amount:number;
    type:string;
    category:string;
}

interface TransactionContextData{
    transactions:Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}


interface TransactionsProviderProps{
    children:ReactNode;
}

export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
)

export function TransactionsProvider({children}:TransactionsProviderProps){

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
       api.get('transactions')
       .then(res => setTransactions(res.data.transactions ))
    }, [])

    async function createTransaction(TransactionInput:TransactionInput ){

          const response = await api.post('/transaction',{
              ...TransactionInput,
              createdAt: new Date()
          })
          const {transaction}  = response.data 
          setTransactions([...transactions, transaction])
    }

    return(
        <TransactionsContext.Provider value = {{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}
import { useContext } from 'react'
import { TransactionsContext } from '../contexts'

export const useTransactions = () => useContext(TransactionsContext)

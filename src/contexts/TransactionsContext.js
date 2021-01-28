import React, { createContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGetTransactions, usePostTransaction } from '../api/transactions'
import { useTryCallback } from '../hooks'

export const TransactionsContext = createContext()

export const TransactionsProvider = ({ children }) => {
  const [, getData] = useGetTransactions()
  const [, postData] = usePostTransaction()

  const [data, setData] = useState([])

  const tryCallback = useTryCallback()

  useEffect(() => {
    tryCallback(async () => {
      const { data: returnedData = [] } = await getData()
      setData(returnedData)
    }, 'transactionGetErrorMessage')
  }, [getData, setData, tryCallback])

  const post = useCallback(
    (newData, callback) =>
      tryCallback(async () => {
        const { data: returnedData } = await postData({ data: newData })
        setData((oldState) => [...oldState, returnedData])
        await callback?.()
      }, 'transactionPostErrorMessage'),
    [postData, setData, tryCallback],
  )

  return (
    <TransactionsContext.Provider value={{ data, post }}>
      {children}
    </TransactionsContext.Provider>
  )
}

TransactionsProvider.propTypes = {
  children: PropTypes.element,
}

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { renderHook, act } from '@testing-library/react-hooks'
import { useTransactions } from './useTransactions'
import { TransactionsProvider } from '../contexts'

const mockTryCallback = jest.fn((func) => func())

jest.mock('../hooks/useTryCallback', () => ({
  useTryCallback: () => mockTryCallback,
}))

const getTransactionsReturn = [1]
const mockGetTransactions = jest.fn(() => ({ data: getTransactionsReturn }))
const mockPostTransactions = jest.fn((params) => params)

jest.mock('../api/transactions', () => ({
  useGetTransactions: () => [{}, mockGetTransactions],
  usePostTransaction: () => [{}, mockPostTransactions],
}))

const wrapper = ({ children }) => (
  <TransactionsProvider>{children}</TransactionsProvider>
)

afterEach(() => {
  jest.clearAllMocks()
})

describe('useTransactions', () => {
  it('should get data correctly', async () => {
    expect(mockGetTransactions).not.toHaveBeenCalled()
    const { result, waitForValueToChange } = renderHook(
      () => useTransactions(),
      { wrapper },
    )
    await waitForValueToChange(() => result.current.data)
    expect(result.current.data).toStrictEqual(getTransactionsReturn)
    expect(mockGetTransactions).toHaveBeenCalledTimes(1)
  })
  it('should post data correctly', async () => {
    const { result, waitForValueToChange } = renderHook(
      () => useTransactions(),
      { wrapper },
    )
    expect(mockPostTransactions).not.toHaveBeenCalled()
    const newTransaction = 2
    act(() => {
      result.current.post(newTransaction)
    })
    await waitForValueToChange(() => result.current.data)
    expect(result.current.data).toStrictEqual([
      ...getTransactionsReturn,
      newTransaction,
    ])
    expect(mockPostTransactions).toHaveBeenCalledTimes(1)
  })
  it('should call callback on post', async () => {
    const { result, waitForValueToChange } = renderHook(
      () => useTransactions(),
      { wrapper },
    )
    const newTransaction = 2
    const callback = jest.fn()
    expect(callback).not.toHaveBeenCalled()
    act(() => {
      result.current.post(newTransaction, callback)
    })
    await waitForValueToChange(() => result.current.data)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

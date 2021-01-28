import { useAxios } from '../hooks'

const baseRoute = '/transactions/'

export const useGetTransactions = () =>
  useAxios(
    {
      url: baseRoute,
    },
    { manual: true },
  )

export const usePostTransaction = () =>
  useAxios(
    {
      url: baseRoute,
      method: 'POST',
    },
    { manual: true },
  )

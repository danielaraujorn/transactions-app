import React, { useMemo } from 'react'
import { AppBar } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import {
  BottomButton,
  Container,
  PaymentCard,
  ValueDisplay,
} from '../../components'
import { usePaths, useTransactions, useFormatCurrency } from '../../hooks'

const Transactions = () => {
  const { formatMessage, formatNumber } = useIntl()
  const formatCurrency = useFormatCurrency()
  const history = useHistory()
  const paths = usePaths()
  const goToNewTransaction = () => history.push(paths.newTransaction)
  const { data: transactions = [] } = useTransactions()
  const transactionsSum = useMemo(
    () => transactions.reduce((acc, { amount }) => acc + amount, 0),
    [transactions],
  )
  return (
    <Container>
      <AppBar position="relative">
        <div>
          <ValueDisplay
            label={formatMessage({ id: 'transactionAmount' })}
            value={formatNumber(transactions.length)}
          />
          <ValueDisplay
            label={formatMessage({ id: 'totalValue' })}
            value={formatCurrency(transactionsSum)}
          />
        </div>
      </AppBar>
      <div>
        {transactions.map((transaction) => (
          <PaymentCard key={transaction.id} {...transaction} />
        ))}
      </div>
      <BottomButton
        onClick={goToNewTransaction}
        buttonProps={{ startIcon: <AddCircle /> }}
      >
        {formatMessage({ id: 'createTransaction' })}
      </BottomButton>
    </Container>
  )
}

export default Transactions

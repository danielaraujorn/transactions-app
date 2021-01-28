import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import 'mutationobserver-shim'
import {
  render,
  act,
  waitFor,
  cleanup,
  fireEvent,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewTransactionForm } from './NewTransactionForm'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({}),
}))

const mockPost = jest.fn()

jest.mock('../../hooks', () => ({
  useTransactions: () => ({ post: mockPost }),
  usePaths: () => ({ transactions: '/route' }),
}))

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({
    formatMessage: jest.fn(({ id }) => id),
  }),
}))

afterEach(cleanup)

describe('NewTransactionForm', () => {
  it('should have the button disabled initially', async () => {
    const { container } = render(<NewTransactionForm />)
    const submitButtonElement = container.querySelector('button[type=submit]')
    await waitFor(async () => {
      await expect(submitButtonElement).toBeDisabled()
    })
  })

  it('should submit when the data is correct', async () => {
    const { container } = render(<NewTransactionForm />)
    const formData = {
      credit_card_holder_name: 'Name Here',
      buyer_document: '444.555.666-88',
      credit_card_number: '5555 6666 7777 8888',
      credit_card_expiration_date: '66/77',
      credit_card_cvv: '888',
      amount: 'R$ 562.216,33',
    }
    const buyerNameElement = container.querySelector(
      'input[name=credit_card_holder_name]',
    )
    const socialSecurityNumber = container.querySelector(
      'input[name=buyer_document]',
    )
    const cardNumber = container.querySelector('input[name=credit_card_number]')
    const expirationDate = container.querySelector(
      'input[name=credit_card_expiration_date]',
    )
    const cardSecurityCode = container.querySelector(
      'input[name=credit_card_cvv]',
    )
    const transactionValue = container.querySelector('input[name=amount]')

    const changes = [
      { element: buyerNameElement, value: formData.credit_card_holder_name },
      { element: socialSecurityNumber, value: formData.buyer_document },
      { element: cardNumber, value: formData.credit_card_number },
      { element: expirationDate, value: formData.credit_card_expiration_date },
      { element: cardSecurityCode, value: formData.credit_card_cvv },
      { element: transactionValue, value: formData.amount },
    ]

    await act(async () => {
      for (const { element, value } of changes)
        await fireEvent.change(element, {
          target: { value },
        })
    })

    const submitButtonElement = container.querySelector('button[type=submit]')
    expect(submitButtonElement).toBeEnabled()

    expect(mockPost).not.toHaveBeenCalled()

    await act(async () => {
      await userEvent.click(submitButtonElement)
    })

    expect(mockPost).toBeCalledTimes(1)
  })
})

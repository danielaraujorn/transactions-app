import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useForm, FormProvider } from 'react-hook-form'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { FORMATS } from './formats'
import { Input, BottomButton } from '../../components'
import { usePaths, useTransactions } from '../../hooks'

const required = true

export const NewTransactionForm = () => {
  const classes = useStyles()
  const [disabledButton, setDisabledButton] = useState(true)
  const { post: postTransaction } = useTransactions()

  const { formatMessage } = useIntl()

  const history = useHistory()
  const paths = usePaths()
  const onSubmit = useCallback(
    (data) => {
      const getUnmaskedData = (object) =>
        Object.entries(object).reduce(
          (acc = {}, [key, value]) => ({
            ...acc,
            [key]: FORMATS[key]?.unmask?.(value) || value,
          }),
          {},
        )
      postTransaction(getUnmaskedData(data), () =>
        history.push(paths.transactions),
      )
    },
    [postTransaction, history, paths],
  )

  const formMethods = useForm({
    mode: 'onChange',
  })

  const { handleSubmit } = formMethods

  const {
    formState: { isDirty, isValid },
  } = formMethods

  useEffect(() => {
    setDisabledButton(!(isDirty && isValid))
  }, [isDirty, isValid, setDisabledButton])
  return (
    <form
      className={classes.formContainer}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <FormProvider {...formMethods}>
        <div className={classes.formInputs}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Input
                name="credit_card_holder_name"
                labelMessage={{ id: 'buyerName' }}
                rules={{ required, minLength: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="buyer_document"
                labelMessage={{ id: 'socialSecurityNumber' }}
                mask={FORMATS.buyer_document.mask}
                rules={{
                  required,
                  pattern: FORMATS.buyer_document.pattern,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="credit_card_number"
                labelMessage={{ id: 'cardNumber' }}
                mask={FORMATS.credit_card_number.mask}
                rules={{
                  required,
                  pattern: FORMATS.credit_card_number.pattern,
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Input
                name="credit_card_expiration_date"
                labelMessage={{ id: 'expirationDate' }}
                mask={FORMATS.credit_card_expiration_date.mask}
                rules={{
                  required,
                  pattern: FORMATS.credit_card_expiration_date.pattern,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                name="credit_card_cvv"
                labelMessage={{ id: 'cardSecurityCode' }}
                mask={FORMATS.credit_card_cvv.mask}
                rules={{
                  required,
                  pattern: FORMATS.credit_card_cvv.pattern,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="amount"
                labelMessage={{ id: 'transactionValue' }}
                mask={FORMATS.amount.mask}
                rules={{ required }}
              />
            </Grid>
          </Grid>
        </div>
      </FormProvider>

      <BottomButton disabled={disabledButton} type="submit">
        {formatMessage({ id: 'createTransaction' })}
      </BottomButton>
    </form>
  )
}

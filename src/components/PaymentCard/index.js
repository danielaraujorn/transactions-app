import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { useIntl } from 'react-intl'
import { useStyles } from './styles'
import { useFormatCurrency } from '../../hooks'
export const PaymentCard = ({
  credit_card_holder_name: name,
  status,
  date,
  amount,
}) => {
  const classes = useStyles()
  const { formatDate, formatMessage } = useIntl()
  const formatCurrency = useFormatCurrency()
  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.status}>
          {formatMessage({ id: status, defaultMessage: status })}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.date}>
          {formatDate(date, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
        <Typography className={classes.amount}>
          {formatCurrency(amount)}
        </Typography>
      </div>
    </div>
  )
}

PaymentCard.propTypes = {
  credit_card_holder_name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

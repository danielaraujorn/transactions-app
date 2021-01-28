import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'

export const ValueDisplay = ({ label, value }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.value}>{value}</Typography>
    </div>
  )
}

ValueDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

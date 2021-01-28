import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { useStyles } from './styles'

export const BottomButton = ({
  children,
  disabled,
  onClick,
  buttonProps,
  type,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Button
        disabled={disabled}
        onClick={onClick}
        size="large"
        fullWidth
        color="primary"
        variant="contained"
        type={type}
        {...buttonProps}
      >
        {children}
      </Button>
    </div>
  )
}

BottomButton.propTypes = {
  children: PropTypes.node,
  buttonProps: PropTypes.shape(Button.propTypes),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

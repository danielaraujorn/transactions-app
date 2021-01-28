import React, { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { TextField } from '@material-ui/core'
import MaskedInput from 'react-text-mask'
import { FormattedMessage } from 'react-intl'

export const Input = ({
  labelMessage,
  min,
  max,
  step,
  type,
  name,
  rules,
  value,
  mask,
  ...rest
}) => {
  const { formatMessage } = useIntl()

  const { control } = useFormContext()

  const label = formatMessage(labelMessage)

  const InputComponent = useMemo(
    () =>
      mask ? (
        <MaskedInput
          mask={mask}
          render={(ref, props) => <TextField inputRef={ref} {...props} />}
        />
      ) : (
        TextField
      ),
    [mask],
  )

  return (
    <Controller
      as={InputComponent}
      value={value}
      defaultValue=""
      name={name}
      variant="outlined"
      rules={rules}
      label={label}
      fullWidth
      inputProps={{
        min: min,
        max: max,
        step: step,
        'aria-label': label,
      }}
      type={type}
      control={control}
      {...rest}
      style={{ flex: 1, minWidth: 100, display: type === 'hidden' && 'none' }}
    />
  )
}

Input.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]),
    ),
    PropTypes.func,
  ]),
  name: PropTypes.string.isRequired,
  labelMessage: PropTypes.shape(FormattedMessage.propTypes).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rules: PropTypes.objectOf(PropTypes.any),
}

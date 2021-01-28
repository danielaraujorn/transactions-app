import { useIntl } from 'react-intl'

export const transformToCurrencyNumber = (value) => {
  const directText = String(value).padStart(3, '0')
  const transformedText =
    directText.slice(0, directText.length - 2) + '.' + directText.slice(-2)
  return Number(transformedText)
}

export const useFormatCurrency = () => {
  const { formatNumber } = useIntl()
  return (amount) =>
    formatNumber(transformToCurrencyNumber(amount), {
      style: 'currency',
      currency: 'BRL',
    })
}

import { createNumberMask } from 'text-mask-addons'

const getOnlyTheNumbers = (value) => value.replace(/\D+/g, '')
const getCurrency = (value) => {
  const stringValue = String(value)
  const decimalsRegex = /(,|\.)\d{1,2}$/
  const decimalsOrEndRegex = /((,|\.)\d{1,2}$)|$/
  const decimals = (stringValue.match(decimalsRegex) || [','])[0]
    .slice(1)
    .padEnd(2, '0')
  const checkedValue = stringValue.replace(decimalsOrEndRegex, decimals)
  return Number(getOnlyTheNumbers(checkedValue))
}

export const FORMATS = {
  buyer_document: {
    pattern: /\d{3}\.\d{3}\.\d{3}-\d{2}/,
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
    unmask: getOnlyTheNumbers,
  },
  credit_card_number: {
    pattern: /\d{4} \d{4} \d{4} \d{4}/,
    mask: [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
    unmask: getOnlyTheNumbers,
  },
  credit_card_expiration_date: {
    pattern: /\d{2}\/\d{2}/,
    mask: [/\d/, /\d/, '/', /\d/, /\d/],
    unmask: getOnlyTheNumbers,
  },
  credit_card_cvv: {
    pattern: /\d{3}/,
    mask: [/\d/, /\d/, /\d/],
  },
  amount: {
    mask: createNumberMask({
      prefix: 'R$ ',
      allowDecimal: true,
      thousandsSeparatorSymbol: '.',
      decimalSymbol: ',',
    }),
    unmask: getCurrency,
  },
}

import '@testing-library/jest-dom/extend-expect'
import { transformToCurrencyNumber } from './useFormatCurrency'

const values = [
  { original: 5000, expected: 50.0 },
  { original: 500, expected: 5.0 },
  { original: 50, expected: 0.5 },
  { original: 5, expected: 0.05 },
]

describe('transformToCurrencyNumber', () => {
  it('should get data correctly', async () => {
    values.map(({ original, expected }) => {
      const result = transformToCurrencyNumber(original)
      expect(result).toBe(expected)
    })
  })
})

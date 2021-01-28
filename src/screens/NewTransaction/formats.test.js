import { FORMATS } from './formats'
import { conformToMask } from 'react-text-mask'

const FORMATS_TO_VERIFY = {
  buyer_document: {
    correctStrings: ['516.165.859-98'],
    wrongStrings: [
      '84989654875',
      '5126.165.859-98',
      '5126.165.859-982',
      '5126.165.859-98',
      '5126.165.859,98',
    ],
    unmaskedStrings: ['84989654875'],
  },
  credit_card_number: {
    correctStrings: ['4859 8415 6956 8415'],
    wrongStrings: [
      '9875321598536548',
      '48598415 6956 8415',
      '48598415-6956 8415',
    ],
    unmaskedStrings: ['9875321598536548'],
  },
  credit_card_expiration_date: {
    correctStrings: ['15/12'],
    wrongStrings: ['1512', '1', '12', '156', '16/1', '1/10'],
    unmaskedStrings: ['6987'],
  },
  credit_card_cvv: {
    correctStrings: ['565'],
    wrongStrings: ['5651', '51', '1', '5/1', '55/1'],
    unmaskedStrings: ['615'],
  },
}

describe('formats', () => {
  it('should test correctly', async () => {
    await Promise.all(
      Object.entries(FORMATS_TO_VERIFY).map(
        async ([key, { correctStrings }]) => {
          const { pattern } = FORMATS[key]
          return await Promise.all(
            correctStrings.map((string) =>
              expect(pattern.test(string)).toBe(true),
            ),
          )
        },
      ),
    )
  })
  it('should mask correctly', async () => {
    await Promise.all(
      Object.entries(FORMATS_TO_VERIFY).map(
        async ([key, { unmaskedStrings }]) => {
          const { pattern, mask } = FORMATS[key]
          return await Promise.all(
            unmaskedStrings.map((string) =>
              expect(
                pattern.test(conformToMask(string, mask).conformedValue),
              ).toBe(true),
            ),
          )
        },
      ),
    )
  })
  it('should unmask correctly', async () => {
    await Promise.all(
      Object.entries(FORMATS_TO_VERIFY).map(
        async ([key, { correctStrings }]) => {
          const { unmask } = FORMATS[key]
          return await Promise.all(
            correctStrings.map(
              (string) =>
                unmask && expect(/[0-9]+/.test(unmask(string))).toBe(true),
            ),
          )
        },
      ),
    )
  })
})

import { createStore, createEvent } from 'effector'

export type Currency = 'TON' | 'USD'

export const amountIncremented = createEvent()
export const amountDecremented = createEvent()
export const amountChanged = createEvent<number>()
export const currencyChanged = createEvent<Currency>()
export const expirationChanged = createEvent<string>()

const STEP = 100
const MIN_AMOUNT = 100

export const $buyAmount = createStore<number>(2000.75)
  .on(amountIncremented, (amount) => amount + STEP)
  .on(amountDecremented, (amount) => Math.max(MIN_AMOUNT, amount - STEP))
  .on(amountChanged, (_, newAmount) => Math.max(MIN_AMOUNT, newAmount))

export const $buyCurrency = createStore<Currency>('TON').on(
  currencyChanged,
  (_, currency) => currency,
)

export const $expiration = createStore<string>('').on(expirationChanged, (_, date) => date)

export const $isValidAmount = $buyAmount.map((amount) => amount >= MIN_AMOUNT)

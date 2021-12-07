import rates from '@/store/modules/rates'
const { state, getters } = rates

state.tickers = [{ id: 'bitcoin', priceUsd: '11844.2036615514710473' }]

describe('Tickers', () => {
  it('returns tickers', () => {
    const tickers = getters.getTickers(state)

    expect(tickers).toEqual(state.tickers)
  })
})

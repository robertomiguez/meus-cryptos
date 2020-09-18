import rates from '@/store/modules/rates'
const { state, mutations } = rates

describe('SET_TICKERS', () => {
  it('add a ticker to the state', () => {
    const tickers = [{
      id: 'bitcoin',
      priceUsd: '11844.2036615514710473'
    }]

    mutations.SET_TICKERS(state, tickers)

    expect(state.tickers).toEqual(tickers)
  })
})

describe('SET_MESSAGE', () => {
  it('adds an error to the state', () => {
    const message = '{ messageType: `error`, description: `Error on something.`'

    mutations.SET_MESSAGE(state, message)

    expect(state.message).toEqual(message)
  })
})

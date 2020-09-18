import { fetchDataCoincap } from '@/api'
import rates from '@/store/modules/rates'
const { actions } = rates

jest.mock('@/api')

describe('tickers', () => {
  it('list of tickers', async () => {
    const tickers = [{ id: 'bitcoin', priceUsd: '11844.2036615514710473' }]
    fetchDataCoincap.mockResolvedValue([{ id: 'bitcoin', priceUsd: '11844.2036615514710473' }])
    const commit = jest.fn()
    await actions.loadTickers({ commit })
    expect(commit).toHaveBeenCalledWith('SET_TICKERS', tickers)
  })
})

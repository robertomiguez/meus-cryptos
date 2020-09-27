import { fetchDataCoincap, fetchDataForex } from '@/api'
import idb from '@/api/idb'

const state = {
  tickers: [],
  fiat: { rates: { USD: 1 } },
  myCoins: [],
  pricesWs: null,
  message: {}
}

const actions = {
  async loadTickers ({ commit }) {
    try {
      const tickers = await fetchDataCoincap()
      commit('SET_TICKERS', tickers)
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on loading tickers. ${error}` })
    }
  },
  async loadFiat ({ commit }) {
    try {
      const fiat = await fetchDataForex()
      // console.warn(fiat)
      commit('SET_FIAT', fiat)
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on loading Fiat. ${error}` })
    }
  },
  async loadMyCoins ({ commit }) {
    try {
      const myCoins = await idb.getCoins()
      commit('SET_MYCOINS', myCoins)
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on loading my coins. ${error}` })
    }
  },
  async deleteCoin ({ commit, dispatch }, coin) {
    try {
      await idb.deleteCoin(coin)
      commit('REMOVE_COIN', coin)
      dispatch('loadPrices')
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on deleting my coins. ${error}` })
    }
  },
  async saveCoin ({ commit, dispatch }, coin) {
    try {
      if (state.myCoins.some(c => (c.name === coin.name && c.id !== coin.id))) {
        commit('SET_MESSAGE', { messageType: 'error', description: 'Coin already exist.' })
        return
      }
      // do not save calculate/external fields
      const
        {
          buyPriceUSD, allocation, currentPrice, currentPriceColor,
          currentValue, buyValue, gainLoss, gainLossPercent, ...tmpCoin
        } = coin
      await idb.saveCoin(tmpCoin)
      commit('ADD_COIN', tmpCoin)
      dispatch('loadPrices')
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on saving new coin. ${error}` })
    }
  },
  async loadPrices ({ commit }) {
    const assets = []
    let totalBuyValue = 0
    state.myCoins.forEach(c => {
      assets.push(c.name.toLowerCase())
      totalBuyValue += +c.buyValueFiat
      c.currentPrice = 0
      c.currentValue = 0
      c.gainLoss = 0
      c.gainLossPercent = 0
    })
    try {
      if (state.pricesWs) state.pricesWs.close()
      state.pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.toString()}`)
      state.pricesWs.onmessage = msg => {
        state.myCoins.forEach(c => {
          c.currentPriceColor = '#f8f8f8'
        })
        // console.log(msg)
        assets.forEach(asset => {
          const coin = state.myCoins.find(c => c.name.toLowerCase() === asset)
          if (!JSON.parse(msg.data)[asset]) return

          coin.buyPriceFiat = (coin.buyValueFiat / coin.amount)
          coin.buyPriceUSD = (coin.buyValueFiat / coin.amount) / state.fiat.rates[coin.fiat]
          coin.currentPriceColor =
            parseFloat(coin.currentPrice).toFixed(coin.currentPrice > 1 ? 2 : 5) >
              parseFloat(JSON.parse(msg.data)[asset]).toFixed(coin.currentPrice > 1 ? 2 : 5)
              ? '#FA8072'
              : parseFloat(coin.currentPrice).toFixed(coin.currentPrice > 1 ? 2 : 5) <
                parseFloat(JSON.parse(msg.data)[asset]).toFixed(coin.currentPrice > 1 ? 2 : 5)
                ? '#90EE90'
                : '#f8f8f8'
          coin.currentPrice = JSON.parse(msg.data)[asset]
          coin.currentValue = JSON.parse(msg.data)[asset] * coin.amount
          coin.allocation = coin.buyValueFiat / totalBuyValue * 100
          coin.buyValueUSD = coin.buyValueFiat / state.fiat.rates[coin.fiat]
          coin.gainLoss = coin.currentValue - (coin.buyPriceFiat * coin.amount / state.fiat.rates[coin.fiat])
          coin.gainLossPercent =
            ((coin.currentValue / (coin.buyPriceFiat * coin.amount / state.fiat.rates[coin.fiat])) * 100) - 100
          const index = state.myCoins.findIndex(c => c.id === coin.id)
          if (index !== -1) state.myCoins.splice(index, 1, coin)
        })
        // state.myCoins.sort((a, b) => (+a.allocation < +b.allocation) ? 1 : -1)
      }
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on loading prices. ${error}` })
    }

    // const pricesWs = new WebSocket(
    //   'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,ripple,kyber-network,compound')
    // pricesWs.onmessage = function (msg) {
    //   console.log(msg.data)
    // }
  }

}

const mutations = {
  SET_TICKERS (state, tickers) {
    state.tickers = tickers // .filter(ticker => ticker.rank <= 10)
  },
  SET_FIAT (state, fiat) {
    state.fiat = fiat
  },
  SET_MYCOINS (state, myCoins) {
    // TODO map including fiat * usd
    state.myCoins = myCoins
  },
  ADD_COIN (state, coin) {
    const coins = state.myCoins.filter(c => c.name !== coin.name)
    coins.push(coin)
    state.myCoins = coins
    // const index = state.myCoins.findIndex(c => c.id === coin.id)
    // if (index !== -1) state.myCoins.splice(index, 1, coin)
  },
  REMOVE_COIN (state, coin) {
    state.myCoins = state.myCoins.filter(c => c.id !== coin.id)
  },
  SET_MESSAGE (state, message) {
    state.message = message
  }
}

const getters = {
  getTickers (state) {
    return state.tickers
  },
  getCryptoNames (state) {
    return state.tickers.map(t => t.id)
  },
  getFiatRate (state) {
    return state.fiat
  },
  getFiatNames (state) {
    return Object.keys(state.fiat.rates)
  },
  getMyCoins (state) {
    return state.myCoins
  },
  getMessage (state) {
    return state.message
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

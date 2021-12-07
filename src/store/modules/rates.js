import { fetchDataCoincap, fetchAwesomeApi } from '@/api'
import idb from '@/api/idb'

const state = {
  tickers: [],
  fiat: {},
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
      const fiatApi = await fetchAwesomeApi()
      const fiat = {}
      let rate = 0
      if (fiatApi.USD) {
        const USDRate = ((+fiatApi.USD.ask + +fiatApi.USD.bid) / 2) // USD Base exchange
        Object.entries(fiatApi).forEach(
          ([key, value]) => {
            rate = ((+value.ask + +value.bid) / 2).toFixed(4)
            const [year, month, day] = (value.create_date) ? value.create_date.slice(0, 10).split('-') : '00-00-0000'
            const time = (value.create_date) ? value.create_date.slice(11, 16) : '00:00'
            if (key === 'USD') key = 'BRL' // Change base exchange from BRL to USD
            fiat[key] = {
              code: +rate > 1 ? value.code : 'USD',
              codein: key === 'BRL' ? key : +rate < 1 ? value.code : 'USD',
              rate: key === 'BRL'
                ? rate
                : +rate < 1
                  ? ((1 / +rate) * USDRate).toFixed(4)
                  : (+rate / +USDRate).toFixed(4), // Change BRL Rate to USD Ratex
              date: `${day}-${month}-${year}`,
              time: time
            }
          }
        )
      }
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
      if (state.myCoins.some(c => (c.id !== coin.id && c.name === coin.name && c.fiat === coin.fiat))) {
        commit('SET_MESSAGE', { messageType: 'error', description: 'Coin already exist.' })
        return
      }
      // do not save calculate/external fields
      const
        {
          buyPriceFiat, buyPriceUSD, allocation, currentPrice, currentPriceColor,
          currentValue, buyValueUSD, profit, profitPercent, ...tmpCoin
        } = coin
      await idb.saveCoin(tmpCoin)
      commit('ADD_COIN', tmpCoin)
      dispatch('loadPrices')
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on saving new coin. ${error}` })
    }
  },
  async cancelCoin ({ commit, dispatch }) {
    try {
      dispatch('loadMyCoins')
    } catch (error) {
      commit('SET_MESSAGE', { messageType: 'error', description: `Error on canceling a new coin. ${error}` })
    }
  },
  async loadPrices ({ commit }) {
    const assets = []
    let totalBuyValue = 0
    state.myCoins.forEach(c => {
      assets.push({ name: c.name.toLowerCase(), fiat: c.fiat })
      // TODO: extract to function
      totalBuyValue += state.fiat[c.fiat].code === 'USD'
        ? c.buyValueFiat / state.fiat[c.fiat].rate
        : c.buyValueFiat * state.fiat[c.fiat].rate
      c.currentPrice = 0
      c.currentValue = 0
      c.profit = 0
      c.profitPercent = 0
    })
    try {
      if (state.pricesWs) state.pricesWs.close()
      const assetNames = assets.map(asset => {
        return asset.name
      })
      state.pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assetNames.toString()}`)
      state.pricesWs.onmessage = msg => {
        state.myCoins.forEach(c => {
          c.currentPriceColor = '#000' // clean color
        })
        assets.forEach(asset => {
          const coin = state.myCoins.find(c => c.name.toLowerCase() === asset.name && c.fiat === asset.fiat)
          if (!JSON.parse(msg.data)[asset.name]) return
          coin.buyPriceFiat = (coin.buyValueFiat / coin.amount)
          // TODO: extract to function
          coin.buyPriceUSD = state.fiat[coin.fiat].code === 'USD'
            ? (coin.buyValueFiat / coin.amount) / state.fiat[coin.fiat].rate
            : (coin.buyValueFiat / coin.amount) * state.fiat[coin.fiat].rate
          coin.currentPriceColor =
            parseFloat(coin.currentPrice).toFixed(coin.currentPrice > 1 ? 2 : 5) >
            parseFloat(JSON.parse(msg.data)[asset.name]).toFixed(coin.currentPrice > 1 ? 2 : 5)
              ? '#FA8072'
              : parseFloat(coin.currentPrice).toFixed(coin.currentPrice > 1 ? 2 : 5) <
              parseFloat(JSON.parse(msg.data)[asset.name]).toFixed(coin.currentPrice > 1 ? 2 : 5)
                ? '#90EE90'
                : '#000'
          coin.currentPrice = JSON.parse(msg.data)[asset.name]
          coin.allocation = coin.buyValueUSD / totalBuyValue * 100
          // TODO: extract to function
          coin.buyValueUSD = state.fiat[coin.fiat].code === 'USD'
            ? coin.buyValueFiat / state.fiat[coin.fiat].rate
            : coin.buyValueFiat * state.fiat[coin.fiat].rate
          coin.currentValue = JSON.parse(msg.data)[asset.name] * coin.amount
          coin.profit = coin.currentValue - coin.buyValueUSD
          coin.profitPercent = ((coin.currentValue / (coin.buyValueUSD)) * 100) - 100
          // const index = state.myCoins.findIndex(c => c.id === coin.id)
          // if (index !== -1) state.myCoins.splice(index, 1, coin)
        })
        state.myCoins.sort((a, b) => (+a.buyValueFiat < +b.buyValueFiat) ? 1 : -1)
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
    const coins = state.myCoins.filter(c => c.id !== coin.id)
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
  getFiatNames (state) {
    return Object.keys(state.fiat)
  },
  getFiat (state) {
    return state.fiat
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

<template>
  <div class="main">
    <AlertMessage
      v-show="Object.keys(message).length"
      :description="message.description"
      :messageType="message.messageType"
    />
    <FormMyCoin
      :coin='coin'
      :fiatNames='fiatNames'
      :cryptoNames='cryptoNames'
      @updateMode="updateMode"
      v-show="formVisible"
    />
    <h1 v-show="!formVisible">ADD
        <font-awesome-icon
        :icon="{ prefix: 'fas', iconName: 'plus-square' }"
        @click="add()"/>
    </h1>
    <div v-show="myCoins.length && !formVisible">
      <table>
          <!-- <caption>Crypto List</caption> -->
          <thead>
              <tr>
                <th scope="col" class="column-name">Name</th>
                <th scope="col">Buy price (Fiat)</th>
                <th scope="col">Buy price (USD)</th>
                <th scope="col">Current price (USD)</th>
                <th scope="col">Allocation</th>
                <th scope="col">Amount</th>
                <th scope="col">Buy value (Fiat)</th>
                <th scope="col">Buy value (USD)</th>
                <th scope="col">Current Value</th>
                <th scope="col">Profit</th>
                <th scope="col">Profit %</th>
                <th scope="col" class='actions'></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="myCoin in myCoins" :key="myCoin.id">
                <td data-label="Name" class="column-name">{{ myCoin.name }}</td>
                <td data-label="Buy price (Fiat)">
                  <span class="smallfiat">{{ myCoin.fiat }}</span>
                  {{ toFixed(myCoin.buyPriceFiat) }}
                </td>
                <td data-label="Buy price (USD)">{{`$`}}{{ toFixed(myCoin.buyPriceUSD) }}
                </td>
                <td :style="{backgroundColor:myCoin.currentPriceColor}"
                    data-label="Current price">{{`$`}}{{ toFixed(myCoin.currentPrice) }}
                </td>
                <td data-label="Allocation">{{ toFixed(myCoin.allocation) }} {{`%`}}</td>
                <td data-label="Amount">{{ toFixedCrypto(myCoin.amount) }}</td>
                <td data-label="Buy Value (Fiat)">
                  <span class="smallfiat">{{ myCoin.fiat }}</span>
                  {{ toFixed(myCoin.buyValueFiat) }}
                </td>
                <td data-label="Buy Value (USD)">{{`$`}}{{ toFixed(myCoin.buyValueUSD) }}</td>
                <td data-label="Current Value">{{`$`}}{{ toFixed(myCoin.currentValue) }}</td>
                <td data-label="Profit"
                  :style="{color: isNaN(myCoin.profit) ? 'grey' : myCoin.profit < 0 ? '#a56361' : '#7596bd'}">
                  {{`$`}}{{ toFixed(myCoin.profit) }}
                </td>
                <td data-label="Profit %"
                  :style="{color: isNaN(myCoin.profit) ? 'grey' : myCoin.profit < 0 ? '#a56361' : '#7596bd'}">
                  {{ toFixed(myCoin.profitPercent) }}%
                </td>
                <td data-label="Actions">
                  <font-awesome-icon
                    :icon="{ prefix: 'fas', iconName: 'edit' }"
                    @click.prevent="upt(myCoin)"
                    class='icon'
                  />
                  <font-awesome-icon
                    :icon="{ prefix: 'fas', iconName: 'trash-alt' }"
                    @click.prevent="del(myCoin)"
                    class='icon'
                  />
                </td>
              </tr>
          </tbody>
      </table>
      <Disclaimer/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormMyCoin from '../components/FormMyCoin.vue'
import AlertMessage from '../components/AlertMessage'
import Disclaimer from '../components/Disclaimer'
import uuid from 'uuid'
import { util } from '../mixins/util'

export default {
  name: 'MyCoins',
  mixins: [util],
  components: {
    FormMyCoin,
    AlertMessage,
    Disclaimer
  },
  data: function () {
    return {
      minutes: 20,
      coin: {},
      formVisible: false
    }
  },
  methods: {
    ...mapActions([
      'loadMyCoins',
      'deleteCoin',
      'loadPrices',
      'loadFiat',
      'loadTickers'
    ]),
    add () {
      this.coin = { id: uuid.v4() }
      this.updateMode(true)
    },
    upt (coin) {
      this.coin = coin
      this.updateMode(true)
    },
    async del (coin) {
      await this.deleteCoin(coin)
    },
    updateMode (visible) {
      this.formVisible = visible
    }
  },
  async created () {
    await this.loadFiat()
    await this.loadMyCoins()
    await this.loadPrices()
    await this.loadTickers()
  },
  computed: {
    ...mapGetters({
      myCoins: 'getMyCoins',
      fiatNames: 'getFiatNames',
      cryptoNames: 'getCryptoNames',
      // fiatRate: 'getFiatRate'
      message: 'getMessage'
    })
  }
}
</script>

<style scoped>
.main {
  text-align: center;
  padding-top: 68px;
  text-align: center;
}

h1 {
  padding: 10px;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width:70%;
  margin: 0 15% 0 15%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  font-size: 1em;
  padding: .625em;
  text-align: right;
}

table th {
  letter-spacing: .1em;
  text-transform: uppercase;
}

.column-name {
  padding-left: 1.625em;
  text-align: left;
  width: 110px;
}

.actions {
  width: 35px;
}

.icon {
  padding: 2px;
}

.smallfiat {
  font-size: 10px;
  font-weight: 800;
}

@media screen and (max-width: 1400px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
  .column-name {
    padding-left: .625em;
    text-align: right;
    width: auto;
  }
}

</style>

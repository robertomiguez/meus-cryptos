<template>
  <div class="wrapper">
    <AlertMessage
      v-show="Object.keys(message).length"
      :description="message.description"
      :messageType="message.messageType"
    />
    <div class="main">
      <h1>Updated every 20 seconds. ({{ minutes }} seconds left)</h1>
      <table>
          <!-- <caption>Statement Summary</caption> -->
          <thead>
              <tr>
                <th scope="col" class="column-mixed">Rank</th>
                <th scope="col" class="column-mixed">Name</th>
                <th scope="col">Price USD</th>
                <th scope="col">Market Cap</th>
                <th scope="col">VWAP (24Hr)</th>
                <th scope="col">Supply</th>
                <th scope="col">Volume (24Hr)</th>
                <th scope="col">Change (24Hr)</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="ticker in tickers" :key="ticker.id">
                <td data-label="Rank" class="column-mixed">{{ ticker.rank }}</td>
                <td data-label="Name" class="column-mixed">{{ ticker.name }}</td>
                <td data-label="Price">{{`$`}}{{ toFixed(ticker.priceUsd) }}</td>
                <td data-label="Market Cap">{{`$`}}{{ toFixedMarket(ticker.marketCapUsd) }}</td>
                <td data-label="VWAP (24Hr)">{{`$`}}{{ toFixed(ticker.vwap24Hr) }}</td>
                <td data-label="Supply">{{ toFixedMarket(ticker.supply) }}</td>
                <td data-label="Volume (24Hr)">{{`$`}}{{ toFixedMarket(ticker.volumeUsd24Hr) }}</td>
                <td data-label="Change (24Hr)" :style="{color: ticker.changePercent24Hr < 0 ? '#a56361' : '#7596bd'}">
                  {{ toFixed(ticker.changePercent24Hr) }} %</td>
              </tr>
          </tbody>
      </table>
    </div>
    <div class="aside aside-1"><BtcDonation/></div>
    <div class="aside aside-2"><ListFiat/></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BtcDonation from '../components/BtcDonation'
import ListFiat from '../components/ListFiat'
import AlertMessage from '../components/AlertMessage'
import { util } from '../mixins/util'

export default {
  name: 'AllCoins',
  mixins: [util],
  components: {
    BtcDonation,
    ListFiat,
    AlertMessage
  },
  data () {
    return {
      minutes: 20
    }
  },
  methods: {
    ...mapActions([
      'loadTickers'
    ])
  },
  created () {
    this.loadTickers()
    window.setInterval(() => {
      this.loadTickers()
      this.minutes = 21
    }, 20000)
    window.setInterval(() => {
      this.minutes -= 1
    }, 1000)
  },
  computed: mapGetters({
    tickers: 'getTickers',
    message: 'getMessage'
  })
}
</script>

<style scoped>

.wrapper {
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  padding: 68px 0px 30px 0px;
}
.wrapper > * {
  flex: 1 100%;
}

.main {
  text-align: center;
  /* background: #fff; */
}

.aside-1 {
  /* background: #fff; */
}

.aside-2 {
  /* background: #fff; */
}

h1 {
  padding: 10px;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  /* width:70%;
  margin: 0 15% 0 15%; */
  width:100%;
  margin: 0;
  table-layout: fixed;
}

table tr {
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: right;
  font-size: 1em;
}

table th {
  font-size: 0.75em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.column-mixed {
  padding-left: 0.725em;
  text-align: left;
}

@media all and (min-width: 600px) {
  .aside { flex: 1 0 0; }
}

@media all and (min-width: 800px) {
  .main    { flex: 3 0px; }
  .aside-1 { order: 1; }
  .main    { order: 2; }
  .aside-2 { order: 3; }
}

@media screen and (max-width: 1400px) {
  table {
    border: 0;
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
  .column-mixed {
    padding-left: 0.625em;
    text-align: right;
  }
}

</style>

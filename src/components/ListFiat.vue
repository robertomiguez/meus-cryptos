<template>
    <div>
      <div class='rate-source-label'>Fiat rates from awesomeapi.com.br</div>
      <div v-for="(value, key, index) in fiat" :key="index">
        <div class="card">
            <img :src="require(`../assets/${key.toLowerCase()}.png`)">
            <div class="container">
                <div class='coin-name'>{{ value.code }} / {{ value.codein }}</div>
                <div class='coin-value'>{{ value.rate }}</div>
                <div class='rate-date-value'>{{ value.date }} {{ value.time }}</div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { util } from '../mixins/util'

export default {
  name: 'ListFiat',
  mixins: [util],
  methods: {
    ...mapActions([
      'loadFiat'
    ])
  },
  mounted () {
    this.loadFiat()
  },
  computed: {
    ...mapGetters({
      fiat: 'getFiat'
    })
  }

}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 25%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 0px;
}

.unstyled-button {
  border: none;
  padding: 0;
  background: none;
}

img {
  width:100%
}

.coin-name {
  font-size: 12px;
  font-family: cursive;
}

.coin-value {
  font-size: 14px;
  font-family: fantasy;
}

.rate-source-label {
  font-size: 15px;
  font-family: fantasy;
  margin-top: 40px;
}

.rate-date-value {
  font-size: 11px;
  font-family: fantasy;
}

</style>

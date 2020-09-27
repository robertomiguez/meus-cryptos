<template>
  <form>
    <ul class="wrapper">
      <li class="form-row">
        <label for="cryptoName">Crypto</label>
        <select v-model="coin.name" id="cryptoName">
          <option v-for="(cryptoName, index) in cryptoNames" :key="index">
            {{ cryptoName }}
          </option>
        </select>
      </li>
      <li class="form-row">
        <label for="fiatName">Fiat</label>
          <select v-model="coin.fiat" id="fiatName">
            <option v-for="(fiatName, index) in fiatNames" :key="index">
              {{ fiatName }}
            </option>
          </select>
      </li>
      <li class="form-row">
        <label for="buyValueFiat">Fiat value</label>
        <input v-model="coin.buyValueFiat" id="buyValueFiat" placeholder="Enter the buy Fiat value.">
      </li>
      <li class="form-row">
        <label for="amount">Amount</label>
        <input v-model="coin.amount" id="amount" placeholder="Enter the amount">
      </li>
      <li class="form-row">
          <button @click="save">Save coin</button>
          <button @click="cancel">Cancel</button>
      </li>
    </ul>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'formMyCoin',
  props: {
    coin: {
      type: Object,
      required: true
    },
    fiatNames: {
      type: Array,
      required: true
    },
    cryptoNames: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'saveCoin'
    ]),
    async save () {
      await this.saveCoin(this.coin)
      this.$emit('updateMode', false)
    },
    cancel () {
      this.$emit('updateMode', false)
    }
  }
}
</script>

<style scoped>
  .wrapper {
    background-color: whitesmoke;
    list-style-type: none;
    padding: 0px;
    border-radius: 3px;
    margin: 0 40%;
  }
  .form-row {
    display: flex;
    justify-content: flex-end;
    padding: .5em;
  }
  .form-row > label {
    padding: .5em 0em .10em 0;
    flex: 1;
  }
  .form-row > input, select {
    flex: 2;
   width:250px;
  }
  .form-row > input
  .form-row > select
  .form-row > button {
    padding: .5em;
  }
  .form-row > button {
   background: grey;
   color: white;
   border: 1;
  }
 @media screen and (max-width: 768px) {
    .wrapper {
      margin: 0;
    }
    .form-row > input {
    flex: 3;
   }
  }
</style>

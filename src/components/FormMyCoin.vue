<template>
  <ul class="wrapper">
    <li class="form-row">
      <label for="cryptoName">Crypto</label>
      <select v-model="myCoin.name" id="cryptoName">
        <option v-for="(cryptoName, index) in cryptoNames" :key="index">
          {{ cryptoName }}
        </option>
      </select>
    </li>
    <li class="form-row">
      <label for="fiatName">Fiat</label>
        <select v-model="myCoin.fiat" id="fiatName">
          <option v-for="(fiatName, index) in fiatNames" :key="index">
            {{ fiatName }}
          </option>
        </select>
    </li>
    <li class="form-row">
      <label for="buyValueFiat">Fiat value</label>
      <input v-model="myCoin.buyValueFiat" id="buyValueFiat" placeholder="Enter the buy Fiat value.">
    </li>
    <li class="form-row">
      <label for="amount">Amount</label>
      <input v-model="myCoin.amount" id="amount" placeholder="Enter the amount">
    </li>
    <li class="form-row">
        <button @click.prevent="save">Save</button>
        <button @click.prevent="cancel">Cancel</button>
    </li>
  </ul>
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
      'saveCoin',
      'cancelCoin'
    ]),
    async save () {
      await this.saveCoin(this.myCoin)
      this.$emit('updateMode', false)
    },
    async cancel () {
      await this.cancelCoin()
      this.$emit('updateMode', false)
    }
  },
  computed: {
    myCoin: function () {
      return this.coin
    }
  }
}
</script>

<style scoped>
  .wrapper {
    list-style-type: none;
    padding: 10px;
    border-radius: 3px;
    border: solid;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
   background-color: #000;
   color: #446285;
   border: 0;
  }
 @media screen and (max-width: 768px) {
    .wrapper {
    }
    .form-row > input
    .form-row > select
    .form-row > button {
    flex: 3;
   }
  }
</style>

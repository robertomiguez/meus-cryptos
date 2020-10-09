<template>
    <div class='container'>
      <div class='title'>supported crypto coins </div>
      <div v-for="cryptoName in cryptoNames" :key="cryptoName">
            <div class="coin-name">
                {{ cryptoName }}
            </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ListCrypto',
  computed: mapGetters({
    cryptoNames: 'getCryptoNames'
  })

}
</script>

<style scoped>
.container{
  margin-bottom: 20px;
}

.title {
  font-size: 1.5em;
  font-family: fantasy;
  margin: 20px;
}

.coin-name {
  padding: 0.1em;
  font-size: 1em;
  font-family: cursive;
}
</style>

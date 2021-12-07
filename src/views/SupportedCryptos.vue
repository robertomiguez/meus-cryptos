<template>
  <div class="wrapper">
    <listCrypto/>
  </div>
</template>

<script>
import listCrypto from '../components/ListCrypto.vue'

export default {
  name: 'SupportedCryptos',
  components: {
    listCrypto
  }
}
</script>

<style scoped>
.wrapper {
  padding: 68px 0px 30px 0px;
}
</style>

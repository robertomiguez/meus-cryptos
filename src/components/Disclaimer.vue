<template>
    <div class="hint">All USD prices are calculated using rate from awesomeapi.com.br. <br><br>
        <span v-for="(value,index) in fiat" :key="index">
          {{ value.code }}/{{ value.codein }} rate {{ value.rate }} on {{ value.date }} at {{ value.time}};
        </span>
        * Brasilia Time <br><br>
        Thank you for using the free meus cryptos website.
        This Website is offered on an "as is" basis and comes with no warranty.
     </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'disclaimer',
  computed: {
    ...mapGetters({
      fiat: 'getFiat'
    })
  }
}
</script>

<style>
.hint {
  padding: 1.625em;
  margin-bottom: 4em;
}
</style>

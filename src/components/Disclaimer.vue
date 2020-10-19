<template>
    <div class="hint">All USD prices are calculated using rate from openrates.io in
        {{ fiatRateDate }} at around 4:00pm CET <br><br>
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
      fiatRateDate: 'getFiatRateDate'
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

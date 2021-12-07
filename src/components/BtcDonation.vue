<template>
    <div class="card">
        <div class="donation">Donation</div>
        <img src="@/assets/btcaddress.jpg" alt="Avatar" style="width:100%">
        <div class="container">
            <div>My Bitcoin address</div>
            <div class="address">
                {{btcAddress.slice(0,10)}}...
                <button class="unstyled-button"
                    v-clipboard:copy="btcAddress">
                    <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'copy'}" size="2x" style="color: gray;"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BtcDonation',
  data () {
    return {
      btcAddress: 'EXAMPLE00000000000000000'
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.donation {
  padding-bottom: .5em;
}

.container {
  padding: .5em;
}

.address {
  padding: .5em;
}

.unstyled-button {
  border: none;
  padding: 0;
  background: none;
}
</style>

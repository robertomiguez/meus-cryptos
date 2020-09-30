<template>
    <div class="main">
        <div class="title">Keep track of your cryptos</div>
        <div class="step">First step - Push add button. </div>
        <div><img src="@/assets/step1.jpg"></div>
        <div class="step">Second step - Fill the form</div>
        <div><img src="@/assets/step2.jpg"></div>
        <div class="step">Third step - Crypto list</div>
        <div><img src="@/assets/step3.jpg"></div>
    </div>
</template>

<script>
export default {
  name: 'HowTo'
}
</script>

<style scoped>
.main {
  text-align: center;
  padding-top: 10em;
  font-weight: 100;
  text-align: center;
}
.title {
  font-size: 2em
}
img {
  margin-bottom: 3em;
  width: 25%;
}
.step {
  padding: 1.5em 0;
}
@media screen and (max-width: 600px) {
  .main {
    padding-top: 6em;
  }
  .title {
    font-size: 1.3em
  }
  img {
    width: 90%;
  }
}
</style>

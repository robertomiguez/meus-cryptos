import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueClipboard from 'vue-clipboard-plus'

library.add(faTwitter, faLinkedin, faCopy, faEdit, faTrashAlt, faPlusSquare)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

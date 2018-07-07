import Vue from 'vue'
import './style.scss'

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')
Object.defineProperty(Vue.prototype, '$moment', { get() { return moment } })

import store from './store'

import App from './components/App.vue'

new Vue({
  el: '#app',
  created() {
    let today = this.$moment().startOf('month')
    this.$store.commit('setCurrentMonth', today.format('YYYY-MM-DD'))
    this.$store.commit('setSelectedDay', today)
  },
  components: {
    App
  },
  store
});

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'
import mixins from './mixins'
import i18nPlugin from './plugins/i18n'
import en from './i18n/en.js'
import ko from './i18n/ko.js'
import PageTitle from './components/fragments/PageTitle.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faClock } from '@fortawesome/free-solid-svg-icons'
import VueApexCharts from 'vue3-apexcharts'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import VueGoodTablePlugin from 'vue-good-table-next'

import 'vue-good-table-next/dist/vue-good-table-next.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

library.add(faUserSecret, faClock)

const i18nStrings = { en, ko }

const app = createApp(App)
app.use(store)
app.use(router)
app.use(BootstrapVue3)
app.use(i18nPlugin, i18nStrings)
app.use(VueSweetalert2)
app.use(VueGoodTablePlugin)
app.use(VueApexCharts)
app.mixin(mixins)
app.use(LoadingPlugin)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('page-title', PageTitle)
app.directive('lowercase', {
  mounted(el) {
    el.addEventListener('input', (e) => {
      e.target.value = e.target.value.toLowerCase()
    })
  }
})
app.directive('uppercase', {
  mounted(el) {
    el.addEventListener('input', (e) => {
      e.target.value = e.target.value.toUpperCase()
    })
  }
})
app.directive('number', {
  mounted(el) {
    el.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[\D]/g, '')
    })
  }
})
app.directive('korean', {
  mounted(el) {
    el.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')
    })
  }
})
app.directive('font-size', (el, binding) => {
  console.log(binding)
  el.style.fontSize = binding.value + 'px'
})
app.mount('#app')

window.Kakao.init('4a56ddaf19f8e5292bfffe7427c1a2b7')

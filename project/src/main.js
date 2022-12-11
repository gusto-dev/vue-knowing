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

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const i18nStrings = { en, ko }

const app = createApp(App)
app.use(store)
app.use(router)
app.use(BootstrapVue3)
app.use(i18nPlugin, i18nStrings)
app.mixin(mixins)
app.component('page-title', PageTitle)
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
app.directive('lowercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.toLowerCase()
    })
  }
})
app.directive('uppercase', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.toUpperCase()
    })
  }
})
app.directive('number', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[\D]/g, '')
    })
  }
})
app.directive('korean', {
  mounted(el) {
    el.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(
        /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,
        ''
      )
    })
  }
})
app.mount('#app')

window.Kakao.init('4a56ddaf19f8e5292bfffe7427c1a2b7')

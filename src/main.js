import Vue from 'vue'
import App from './App.vue'
import VueEditableCell from '../packages'

Vue.use(VueEditableCell)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

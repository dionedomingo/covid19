/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

import VueAxios from 'vue-axios'
Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*' 
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept' 

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faFemale,faMale,faGenderless, faCoffinCross,faLifeRing,faCaretUp} from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon,FontAwesomeLayers,FontAwesomeLayersText} from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin,FormDatepickerPlugin } from 'bootstrap-vue'
library.add(faUserSecret,faFemale,faMale,faGenderless,faCoffinCross,faLifeRing,faCaretUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(FormDatepickerPlugin)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// TODO: Chart stuff.
//import VueApexCharts from 'vue-apexcharts'
//Vue.component('apexchart', VueApexCharts)

Vue.component(
    'covid',
    require('./components/Covid.vue').default
);

Vue.component(
    'country',
    require('./components/Country.vue').default
);

const app = new Vue({
    el: '#app'
});

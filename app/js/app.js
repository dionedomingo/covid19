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



// Fontawesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faFemale,faMale,faGenderless, faCoffinCross} from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon,FontAwesomeLayers,FontAwesomeLayersText} from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
library.add(faUserSecret,faFemale,faMale,faGenderless,faCoffinCross)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

if(window.location.host.includes('127.0.0.1')){
    window.api_url = window.location.origin + '/public/mock-api';
}else{
    window.api_url = 'https://coronavirus-ph-api.now.sh';
}

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(
    'covid',
    require('./components/Covid.vue').default
);
console.log(window.location);
const app = new Vue({
    el: '#app'
});

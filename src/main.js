// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(VueMaterial);

import 'vue-material/dist/vue-material.css'

Vue.material.registerTheme('default', {
  primary: {
  	color: 'amber',
  	hue: 700,
  	textColor: 'white',
  },
  accent: 'red',
  warn: 'red',
  background: 'white'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

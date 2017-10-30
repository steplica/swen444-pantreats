// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import VueMaterial from 'vue-material';
import Vuetify from 'vuetify';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(VueMaterial);
Vue.use(Vuetify);

import 'vue-material/dist/vue-material.css';
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/dist/vuetify.min.js';

/***
 * Use https://material.io/color to find out the numbers.
 * Note that this is the theme for VueMaterial; Vuetify's is located in stylus/main.styl
 * and any changes should be made in both places for visual consistency.
 */
Vue.material.registerTheme('default', {
  primary: {
  	color: 'brown',
  	hue: 700,
  },
  secondary: {
    color: 'orange',
    hue: 50,
  },
  accent: {
    color: 'blue-grey',
    hue: 200,
  },
  accentSecondary: {
    color: '#CBAE82'
  },
  accentTertiary: {
    color: 'brown',
    hue: 200,
  },
  warn: 'red',
  background: {
      color: 'orange',
      hue: 50,
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

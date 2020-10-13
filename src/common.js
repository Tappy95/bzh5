// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from 'App'
//

// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
//
//
// import Mint from 'mint-ui';
// Vue.use(Mint);
// import 'mint-ui/lib/style.css';

import Utils from "./utils/Utils"
window.APP = Utils;
// Vue.use(Mint);

// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)

// 第二步
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
// import { Navbar, TabItem } from 'mint-ui';

// Vue.component(Navbar.name, Navbar);
// Vue.component(TabItem.name, TabItem);

import { style } from "./utils/style";

Vue.prototype.$style=style;

/**
 */
import { post,get,put,del,uploadFile} from './utils/http'
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$put=put;
Vue.prototype.$del=del;
Vue.prototype.$uploadFile=uploadFile;



import {getSession,setSession,delSession} from './utils/cookie'
Vue.prototype.$getSession=getSession;
Vue.prototype.$setSession=setSession;
Vue.prototype.$delSession=delSession;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })
//


// import Vue from 'vue'
// Vue.config.productionTip = false

Vue.config.productionTip = false
export default (Index) => {
  // 实例化VUE
  new Vue({
    render: h => h(Index),
  }).$mount('#app');
};

import Vue from 'vue';
import VueRouter from 'vue-router';
import * as Admin from '@components/Admin';

// mount Vue Router
Vue.use(VueRouter);

// routes defined for Admin Portal with respective components
const routes = [
  { path: '/', component: Admin.Dashboard },
  { path: '/users', component: Admin.Users }
];

// instantiate Vue instance with Vue Router, etc
new Vue({
  el: '#app',
  components: { App: Admin.App },
  router: new VueRouter({
    mode: 'history',
    base: 'admin',
    routes
  })
});

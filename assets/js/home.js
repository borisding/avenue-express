import Vue from 'vue';
import Home from '@components/Home.vue';

new Vue({
  el: '#greetings',
  template: '<Home/>',
  components: { Home }
});

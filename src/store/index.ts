import Vue from 'vue';
import Vuex from 'vuex';
import TimeManagement from '@/store/modules/TimeManagement';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    TimeManagement,
  },
});

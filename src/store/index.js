import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import userModule from './user'

export default new Vuex.Store({
    modules:[userModule]
})
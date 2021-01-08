import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postCount:0,
  },
  getters:{
    getPostCount(state){
      return state.postCount
    }
  },
  mutations: {
  setPostCount(state, postCount){
    state.postCount = postCount
  }
  },
  actions: {
    async postCount({commit}){
      let posts = await axios.get('posts')
      let count = posts.data.length
      if(count){
        localStorage.setItem("postCount",count)
        commit('setPostCount',count)
      }
    }
  },
  modules: {

  }
})

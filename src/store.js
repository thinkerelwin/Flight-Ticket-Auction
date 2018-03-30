import Vue from 'Vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {

  },
  actions: {
    login({commit}, authData) {
        axios.post('login', {
          name: authData.username,
          password: authData.password,
        }).then(res => {
            console.log(res);
            // this.$emit('passingAuthInfo', res)

            // this.username = '';
            // this.password = '';
          })
          .catch(error => {
            console.log(error)
            // this.warningMessage = "name and password aren't matched, please try again!"
          })
    }
  },
  getters: {

  }
})

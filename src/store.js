import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import normalAxios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    availability: null,
    results: {},
  },
  getters: {
    results: state => {
      return state.results;
    },
    idToken: state => {
      return state.idToken;
    }
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.Id
      state.availability = userData.flightChoice
    },
    queryResult (state, orderData) {
      state.results = orderData.orderResults
    }
  },
  actions: {
    login({commit}, authData) {
        axios.post('login', {
          name: authData.username,
          password: authData.password,
        }).then(res => {
            console.log('login respond: ' + res);
            // this.$emit('passingAuthInfo', res)
            commit('authUser', {
              token: res.data.token,
              Id: res.data.userdata._id,
              flightChoice: res.data.userdata.flight
            })
          })
          .catch(error => {
            console.log(error)
            // this.warningMessage = "name and password aren't matched, please try again!"
          })
    },
    storeUser ({commit}, userData) {
      // normalAxios.
    },
    queryorder ({commit, state}, userInput) {

      const formData = {
        startDate: userInput.dateRange[0].toISOString().slice(0, 10),
        endDate: userInput.dateRange[1].toISOString().slice(0 ,10),
        status: userInput.status,
        // recordOperator: this.recordOperator
      }

      console.log(formData);

      function searchString() {
        let queryString = '';

        if (formData.startDate == formData.endDate) {
          queryString += `[recordTime,=,${formData.startDate}]`
        } else {
          queryString += `[recordTime,>,${formData.startDate}],[recordTime,<,${formData.endDate}]`
        }

        if (formData.status) {
          queryString += `,[status,=,${formData.status}]`
        }
        // if (formData.recordOperator) {
        //   queryString += `,[recordOperator,=,${formData.recordOperator}]` //currently bugged
        // }
        console.log(queryString);
        return queryString
      }

      normalAxios.get('api/webuy', {
        headers: {
          'Authorization': 'Bearer ' + state.idToken
        },
        params: {
          limit: 'all',
          orderBy: 'datetime',
          orderMethod: 'desc',
          searching: searchString(),
        }
      }).then( res => {
          // this.results = res.data.result;  //how to pass this.results info back to showList.vue?
          commit('queryResult', {
            orderResults: res.data.result,
          })
          console.log(state.results)
        })
        .catch(error => console.log(error))
    }
  },
})

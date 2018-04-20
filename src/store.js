import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import normalAxios from 'axios'

import router from './router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    authType: null,
    username: null,
    availability: null,
    results: [],
    entries: 0,
    dateRange: null,
    status: null,
    warningMessage: null,
    waitResponse: false
  },
  getters: {
    authType (state) {
      return state.authType
    },
    username (state) {
      return state.username
    },
    results: state => {
      return state.results
    },
    entries: state => {
      return state.entries
    },
    // came from vue pagination
    page: state => {
      return state.myPagination.page
    },
    idToken: state => {
      return state.idToken
    },
    dateRange: state => {
      return state.dateRange
    },
    status: state => {
      return state.status
    },
    warningMessage: state => {
      return state.warningMessage
    },
    flightsAvailable: state => {
      return state.availability
    },
    waitResponse: state => {
      return state.waitResponse
    }
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.authType = userData.authType
      state.username = userData.username
      state.availability = userData.flightChoice
    },
    queryResult (state, orderData) {
      state.results = orderData.orderResults
      state.entries = orderData.orderEntries
    },
    queryFilter (state, filterCondition) {
      state.dateRange = filterCondition.dateRange
      state.status = filterCondition.status
    },
    // came from vue pagination
    updatePage (state, pageValue) {
      state.myPagination.page = pageValue
    },
    resetPage (state) {
      state.myPagination.page = 1
    },
    clearAuthData (state) {
      state.idToken = null
      state.authType = null
      state.username = null
      state.availability = null
      state.results = []
      state.entries = 0
      state.myPagination.page = 1
      state.dateRange = null
      state.status = null
      state.warningMessage = null
    },
    waiting (state) {
      state.waitResponse = !state.waitResponse
    }
  },
  actions: {
    login ({ commit, state }, authData) {
      commit('waiting')
      axios
        .post('login', {
          name: authData.username,
          password: authData.password
        })
        .then(res => {
          commit('waiting')
          // console.log(res)
          this.username = ''
          this.password = ''
          // this.$emit('passingAuthInfo', res)
          commit('authUser', {
            token: res.data.token,
            authType: res.data.userdata.auth,
            username: res.data.userdata.cooperation,
            flightChoice: res.data.userdata.flight
          })
          const now = Date.now()
          const expirationDate = now + 60 * 60 * 1000 // set autologOut after 1hr log in

          localStorage.setItem('token', res.data.token)
          localStorage.setItem('authType', res.data.userdata.auth)
          localStorage.setItem('username', res.data.userdata.cooperation)
          localStorage.setItem('flightChoice', res.data.userdata.flight)
          localStorage.setItem('expirationDate', expirationDate)
          router.replace('/')
        })
        .catch(error => {
          console.log(error)
          commit('waiting')
          state.warningMessage =
            "name and password aren't matched, please try again!"
        })
    },
    signOut ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('authType')
      localStorage.removeItem('username')
      localStorage.removeItem('flightChoice')
      localStorage.removeItem('expirationDate')
      router.replace('/login')
    },
    tryAutoLogIn ({ commit }) {
      const tokenLocal = localStorage.getItem('token')
      if (!tokenLocal) {
        return
      }

      const now = Date.now()
      const expirationDate = localStorage.getItem('expirationDate') // it's string
      if (now >= Number(expirationDate)) {
        return
      }

      const authTypeLocal = localStorage.getItem('authType')
      const usernameLocal = localStorage.getItem('username')
      const flightChoiceLocal = localStorage.getItem('flightChoice')

      commit('authUser', {
        token: tokenLocal,
        authType: authTypeLocal,
        username: usernameLocal,
        flightChoice: flightChoiceLocal
      })
      router.replace('/')
    },
    signup ({ commit, state }, authData) {
      const authHeader = {
        headers: {
          Authorization: 'Bearer ' + state.idToken
        }
      }
      axios
        .post(
          '/api/user',
          {
            auth: authData.auth,
            name: authData.username,
            password: authData.password,
            cooperation: authData.cooperation,
            group: authData.group,
            flight: authData.flight
          },
          authHeader
        )
        .then(res => {
          // console.log(res)
          alert(`account ${authData.username} is created!`)
          // router.replace('/')
        })
        .catch(error => {
          console.log(error)
          state.warningMessage = 'please check format of the submit form!'
        })
    },
    updatePage ({ commit, state }, pageValue) {
      commit('updatePage', pageValue)
    },
    queryorder ({ commit, state }, userInput) {
      commit('waiting')
      if (!userInput.dateRange) {
        let defaultStartDate = new Date()
        let defaultEndDate = new Date()
        userInput.dateRange = [defaultStartDate, defaultEndDate]
      }

      let revisedStartDate = new Date(
        userInput.dateRange[0].getTime() + 8 * 60 * 60 * 1000
      )
      let revisedEndDate = new Date(
        userInput.dateRange[1].getTime() + 8 * 60 * 60 * 1000
      )

      // console.log(state.dateRange, userInput.dateRange);
      // console.log(state.dateRange == userInput.dateRange);

      commit('queryFilter', {
        dateRange: userInput.dateRange,
        status: userInput.status
      })
      // console.log(userInput.dateRange)
      // console.log([revisedStartDate, revisedEndDate]);

      const formData = {
        startDate: revisedStartDate.toISOString().slice(0, 10),
        endDate: revisedEndDate.toISOString().slice(0, 10),
        status: userInput.status
      }

      // console.log(formData)

      function searchString () {
        let queryString = ''

        if (formData.startDate === formData.endDate) {
          queryString += `[recordTime,=,${formData.startDate}]`
        } else {
          queryString += `[recordTime,>,${formData.startDate}],[recordTime,<,${
            formData.endDate
          }]`
        }

        if (formData.status) {
          queryString += `,[status,=,${formData.status}]`
        }
        return queryString
      }

      normalAxios
        .get('api/webuy', {
          headers: {
            Authorization: 'Bearer ' + state.idToken
          },
          params: {
            limit: 'all',
            // limit: 5,
            // offset: 5,
            orderBy: 'datetime',
            orderMethod: 'desc',
            searching: searchString()
          }
        })
        .then(res => {
          // this.results = res.data.result;  //how to pass this.results info back to showList.vue?
          commit('queryResult', {
            orderResults: res.data.result,
            orderEntries: res.data.entries
          })
          // console.log(res);
          commit('waiting')
        })
        .catch(error => {
          console.log(error)
          commit('waiting')
        })
    }
  },
  modules: {
    // came from vue pagination
    myPagination: {
      state: {
        page: 1
      },
      mutations: {
        'myPagination/PAGINATE' (state, page) {
          state.page = page
        }
      }
    }
  }
  // modules: {
  //   myPaginator
  // }
})

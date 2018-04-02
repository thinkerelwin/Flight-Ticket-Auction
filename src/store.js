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
    results: {},
    dateRange: null,
    status: null,
    warningMessage: null
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
    },
    queryFilter (state, filterCondition) {
      state.dateRange = filterCondition.dateRange
      state.status = filterCondition.status
    },
    clearAuthData (state) {
      state.idToken = null
      state.authType = null
      state.username = null
      state.availability = null
      state.results = {}
      state.dateRange = null
      state.status = null
      state.warningMessage = null
    }
  },
  actions: {
    login ({commit, state}, authData) {
      axios.post('login', {
        name: authData.username,
        password: authData.password

      }).then(res => {
        console.log(res)
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
        const expirationDate = now + 3600 * 1000 //set autologOut after 1hr log in

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('authType', res.data.userdata.auth)
        localStorage.setItem('username', res.data.userdata.cooperation)
        localStorage.setItem('flightChoice', res.data.userdata.flight)
        localStorage.setItem('expirationDate', expirationDate)
        router.replace('/')
      }).catch(error => {
        console.log(error)
        state.warningMessage = "name and password aren't matched, please try again!"
      })
    },
    signOut ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('toekn')
      localStorage.removeItem('authType')
      localStorage.removeItem('username')
      localStorage.removeItem('flightChoice')
      localStorage.removeItem('expirationDate')
      router.replace('/login')
    },
    tryAutoLogIn({commit}) {
      const tokenLocal = localStorage.getItem('token')
      if (!tokenLocal) {
        return
      }

      const now = Date.now()
      const expirationDate = localStorage.getItem('expirationDate') //it's string
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
    signup({commit, state}, authData) {
      const authHeader = {
        headers: {
          'Authorization': 'Bearer ' + state.idToken
        }
      }
      axios.post('http://kusakawa.ddns.net:8080/farener/public/api/makeUser', {
        name: authData.username,
        password: authData.password,
        auth: authData.auth,
        flight: authData.flight,
        cooperation: authData .cooperation
      }, authHeader).then(res => {
        console.log(res)
        // this.username = ''
        // this.password = ''
        alert(`account ${authData.username} is created!`)
        // router.replace('/')
      }).catch(error => {
        console.log(error)
        state.warningMessage = "please check format of the submit form!"
      })
    },
    queryorder ({commit, state}, userInput) {

      if (!userInput.dateRange) {
        let defaultStartDate = new Date()
        let defaultEndDate = new Date()
        userInput.dateRange = [defaultStartDate, defaultEndDate]
      }

      // console.log(userInput.dateRange)

      let revisedStartDate = new Date(userInput.dateRange[0].getTime() + 8 * 60 * 60 * 1000)
      let revisedEndDate = new Date(userInput.dateRange[1].getTime() + 8 * 60 * 60 * 1000)

      commit('queryFilter', {
        dateRange: [revisedStartDate, revisedStartDate],
        status: userInput.status
      })
      console.log(userInput.dateRange)
      console.log([revisedStartDate, revisedStartDate])

      const formData = {
        startDate: revisedStartDate.toISOString().slice(0, 10),
        endDate: revisedEndDate.toISOString().slice(0, 10),
        status: userInput.status
        // flight: ['AA', 'DL']
        // recordOperator: this.recordOperator
      }

      console.log(formData)

      function searchString () {
        let queryString = ''

        if (formData.startDate === formData.endDate) {
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
        console.log(queryString)
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
          searching: searchString()
        }
      }).then(res => {
        // this.results = res.data.result;  //how to pass this.results info back to showList.vue?
        commit('queryResult', {
          orderResults: res.data.result
        })
        console.log(state.results)

      }).catch(error => console.log(error))
    }
  },
})

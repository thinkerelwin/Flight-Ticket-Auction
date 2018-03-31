import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://kusakawa.ddns.net:8080/farener/public/'
})

export default instance

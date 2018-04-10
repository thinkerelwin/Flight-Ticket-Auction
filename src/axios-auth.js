import axios from 'axios'

const instance = axios.create({
  baseURL: "http://209.135.157.161/farener/public/"
  // baseURL: "http://kusakawa.ddns.net:8080/farener/public/"
});

export default instance

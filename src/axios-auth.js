import axios from 'axios'

const instance = axios.create({
  baseURL: "http://209.135.157.161/farener/public/"
});

export default instance

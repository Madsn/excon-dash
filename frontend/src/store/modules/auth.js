import axios from 'axios'

let AUTH_TOKEN = 'auth_token'

axios.defaults.baseURL = 'http://localhost:8888/api/v1/'

function setAxiosToken () {
  if (localStorage.getItem(AUTH_TOKEN)) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + localStorage.getItem(AUTH_TOKEN)
  }
}
setAxiosToken()

const state = {
  isAuthenticated: false
}

const getters = {
  isAuthenticated: state => state.isAuthenticated
}

const actions = {
  getAuthToken ({commit}, credentials) {
    axios.post('obtain-auth-token/', credentials).then((response) => {
      localStorage.setItem(AUTH_TOKEN, response.data.token)
      setAxiosToken()
    }).catch((err) => {
      console.error('Error getting auth token')
      console.error(err)
    })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}

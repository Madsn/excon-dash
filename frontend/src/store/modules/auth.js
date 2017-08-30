import * as types from '../mutation-types'
import axios from 'axios'

let AUTH_TOKEN = 'auth_token'

axios.defaults.baseURL = 'http://localhost:8888/api/v1/'
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 300
}

function setAxiosToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token
  } else {
    token = sessionStorage.getItem(AUTH_TOKEN)
    axios.defaults.headers.common['Authorization'] = token
  }
}

setAxiosToken()

const state = {
  isAuthenticated: sessionStorage.getItem(AUTH_TOKEN) !== null,
  token: sessionStorage.getItem(AUTH_TOKEN)
}

const getters = {
  isAuthenticated: state => state.isAuthenticated
}

const actions = {
  getAuthToken ({commit}, credentials) {
    setAxiosToken()
    return axios.post('obtain-auth-token/', credentials).then((response) => {
      commit(types.SET_AUTHENTICATED, {authenticated: true, token: response.data.token})
      return Promise.resolve(response)
    }, (err) => {
      commit(types.SET_AUTHENTICATED, {authenticated: false})
      return Promise.reject(err)
    })
  },
  logout ({commit}) {
    commit(types.SET_AUTHENTICATED, {authenticated: false})
  }
}

const mutations = {
  [types.SET_AUTHENTICATED] (state, payload) {
    state.isAuthenticated = payload.authenticated
    if (payload.authenticated) {
      setAxiosToken(payload.token)
      state.token = payload.token
      sessionStorage.setItem(AUTH_TOKEN, payload.token)
    } else {
      sessionStorage.removeItem(AUTH_TOKEN)
      state.token = null
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

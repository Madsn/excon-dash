import * as types from '../mutation-types'
import axios from 'axios'

let AUTH_TOKEN = 'auth_token'

axios.defaults.baseURL = 'http://localhost:8888/api/v1/'

function setAxiosToken (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + token
  } else {
    axios.defaults.headers.common['Authorization'] = null
  }
}
setAxiosToken()

const state = {
  isAuthenticated: false,
  token: null
}

const getters = {
  isAuthenticated: state => state.isAuthenticated
}

const actions = {
  getAuthToken ({commit}, credentials) {
    setAxiosToken()
    return axios.post('obtain-auth-token/', credentials).then((response) => {
      commit(types.SET_AUTHENTICATED, {authenticated: true, token: response.data.token})
    }).catch((err) => {
      commit(types.SET_AUTHENTICATED, {authenticated: false})
      console.error(err)
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
      localStorage.setItem(AUTH_TOKEN, payload.token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
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

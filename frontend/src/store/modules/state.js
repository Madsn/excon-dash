import * as types from '../mutation-types'
import moment from 'moment'

// initial state
const state = {
  socketConnected: false,
  socket: null,
  message: '-',
  eventNumber: '-',
  virtualClockRate: '_',
  virtualClockSeed: null,
  realClockSeed: null
}

// getters
const getters = {
  message: state => state.message,
  eventNumber: state => state.eventNumber,
  virtualClockRate: state => state.virtualClockRate,
  virtualClockSeed: state => state.virtualClockSeed,
  realClockSeed: state => state.realClockSeed
}

// actions
const actions = {
  /*
  getDashboard ({commit}) {
    if (localStorage.getItem(AUTH_TOKEN)) {
      axios.get('custom/dashboard/').then((response) => {
        console.log(response)
        commit(types.SUCCESS_LOAD_DASHBOARD, response.data)
      })
    } else {
      console.error('Must be logged in first')
    }
  },
  */
}

// mutations
const mutations = {
  [types.SOCKET_ONOPEN] (state, event) {
    state.socketConnected = true
  },
  [types.SOCKET_ONCLOSE] (state, event) {
    state.socketConnected = false
  },
  [types.SOCKET_ONERROR] (state, event) {
    console.error(state, event)
  },
  // default handler called for all methods
  [types.SOCKET_ONMESSAGE] (state, message) {
    console.log('message')
    console.log(message)
    console.log(state)
    let payload = JSON.parse(message.data).payload.data
    state.message = payload.message ? payload.message : '-'
    state.eventNumber = payload.current_event
    state.virtualClockSeed = moment(payload.clock_virt_seed, moment.ISO_8601)
    state.virtualClockRate = payload.clock_virt_rate
    state.realClockSeed = moment(payload.clock_real_seed, moment.ISO_8601)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

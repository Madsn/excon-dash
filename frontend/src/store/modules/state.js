import * as types from '../mutation-types'
import moment from 'moment'

// initial state
const state = {
  socketConnected: false,
  message: '-',
  eventNumber: '-',
  virtualClockRate: '_',
  virtualClockSeed: null,
  stateChangeTimestamp: null,
  virtualClockTime: null,
  realClockTime: null
}

// getters
const getters = {
  message: state => state.message,
  eventNumber: state => state.eventNumber,
  virtualClockTime: state => state.virtualClockTime,
  virtualClockRate: state => state.virtualClockRate,
  realClockTime: state => state.realClockTime
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
    if (payload === null) return
    state.message = payload.message ? payload.message : '-'
    state.eventNumber = payload.event_number ? payload.event_number : '-'
    state.virtualClockSeed = payload.virtual_clock ? moment(payload.virtual_clock, moment.ISO_8601) : null
    state.virtualClockRate = payload.clock_speed ? payload.clock_speed : 0
    state.stateChangeTimestamp = payload.created ? moment(payload.created, moment.ISO_8601) : null
  },
  [types.UPDATE_CLOCKS] (state, message) {
    if (state.virtualClockSeed === null || state.stateChangeTimestamp === null) {
      return null
    }
    let now = moment()
    let diffRealToNow = now.diff(state.stateChangeTimestamp, 'seconds')
    let adjustedDiffRealToNow = diffRealToNow * (state.virtualClockRate)
    state.virtualClockTime = state.virtualClockSeed.clone().add(adjustedDiffRealToNow, 'seconds')
      .format('DDHHmm[D]MMMYY (HH:mm:ss)').toUpperCase()
    state.realClockTime = moment() // .format('DDHHmm[D]MMMYY').toUpperCase()
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

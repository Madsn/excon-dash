import * as types from '../mutation-types'
import moment from 'moment'

const ADMIN_STREAM = 'admin-changes'

// initial state
const state = {
  socketConnected: false,
  socket: null,
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
  realClockTime: state => state.realClockTime,
  socketConnected: state => state.socketConnected
}

function streamAdminChange (args, obj) {
  console.log(args.rootState.auth)
  args.state.socket.stream(ADMIN_STREAM).send({token: args.rootState.auth.token, ...obj})
}

// actions
const actions = {
  incrementEventNumber (args) {
    args.commit(types.INCREMENT_EVENT)
    streamAdminChange(args, {action: 'incrementEventNumber'})
  },
  decrementEventNumber (args) {
    args.commit(types.DECREMENT_EVENT)
    streamAdminChange(args, {action: 'decrementEventNumber'})
  },
  setEventNumber (args, payload) {
    args.commit(types.SET_EVENT, payload)
    streamAdminChange(args, {action: 'setEventNumber', payload: payload})
  },
  incrementClockSpeed (args) {
    args.commit(types.INCREMENT_CLOCK_SPEED)
    streamAdminChange(args, {action: 'incrementClockSpeed'})
  },
  decrementClockSpeed (args) {
    args.commit(types.DECREMENT_CLOCK_SPEED)
    streamAdminChange(args, {action: 'decrementClockSpeed'})
  },
  setMessage (args, payload) {
    args.commit(types.SET_MESSAGE, payload)
    streamAdminChange(args, {action: 'setMessage', payload: payload})
  },
  setVirtualClock (args, payload) {
    streamAdminChange(args, {action: 'setVirtualClock', payload: payload.format('YYYY-MM-DDTHH:mm')})
  }
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
    let payload = JSON.parse(message.data).payload
    let error = payload.error
    if (error) {
      console.error(error)
      return
    }
    let data = payload.data
    if (data === null) return
    state.message = data.message ? data.message : '-'
    state.eventNumber = data.event_number ? data.event_number : '-'
    state.virtualClockSeed = data.virtual_clock ? moment(data.virtual_clock, moment.ISO_8601) : null
    state.virtualClockRate = data.clock_speed ? data.clock_speed : 0
    state.stateChangeTimestamp = data.created ? moment(data.created, moment.ISO_8601) : null
  },
  [types.UPDATE_CLOCKS] (state, message) {
    let now = moment()
    state.realClockTime = moment().format('DDHHmm[D]MMMYY').toUpperCase()
    if (state.virtualClockSeed === null || state.stateChangeTimestamp === null) {
      return null
    }
    let diffRealToNow = now.diff(state.stateChangeTimestamp, 'seconds')
    let adjustedDiffRealToNow = diffRealToNow * (state.virtualClockRate)
    state.virtualClockTime = state.virtualClockSeed.clone().add(adjustedDiffRealToNow, 'seconds')
      .format('DDHHmm[D]MMMYY (HH:mm:ss)').toUpperCase()
  },
  [types.INCREMENT_EVENT] (state) {
    state.eventNumber = isNaN(state.eventNumber) ? 1 : state.eventNumber + 1
  },
  [types.DECREMENT_EVENT] (state) {
    state.eventNumber = isNaN(state.eventNumber) ? 0 : Math.max(0, state.eventNumber - 1)
  },
  [types.INCREMENT_CLOCK_SPEED] (state) {
    state.virtualClockRate = isNaN(state.virtualClockRate) ? 1 : state.virtualClockRate + 1
  },
  [types.DECREMENT_CLOCK_SPEED] (state) {
    state.virtualClockRate = isNaN(state.virtualClockRate) ? 0 : Math.max(0, state.virtualClockRate - 1)
  },
  [types.SET_MESSAGE] (state, payload) {
    state.message = payload
  },
  [types.SET_EVENT] (state, payload) {
    state.eventNumber = payload
  },
  [types.SET_SOCKET] (state, payload) {
    state.socket = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

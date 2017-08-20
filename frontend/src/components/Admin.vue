<template>
  <div>
    <excon :admin="true"></excon>
    <v-layout row wrap v-if="showDateTimePickers">
      <v-flex sm12 md6 lg5 offset-lg2>
        <v-date-picker v-model="selectedDate" actions landscape></v-date-picker>
      </v-flex>
      <v-flex sm12 md6 lg5>
        <v-time-picker v-model="selectedTime" landscape format="24hr"></v-time-picker>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Excon from './Excon'

  export default {
    name: 'admin',
    components: {
      Excon
    },
    computed: {
      ...mapGetters({
        virtualClockTime: 'virtualClockTime',
        virtualClockRate: 'virtualClockRate',
        message: 'message',
        eventNumber: 'eventNumber'
      })
    },
    data () {
      return {
        selectedDate: null,
        selectedTime: null,
        showDateTimePickers: false
      }
    }
  }
</script>

<style>
</style>

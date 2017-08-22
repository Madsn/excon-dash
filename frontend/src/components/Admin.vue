<template>
  <div class="admin">
    <excon :admin="true"></excon>
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
    }
  }
</script>

<style>
</style>

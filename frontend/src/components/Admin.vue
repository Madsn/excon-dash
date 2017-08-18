<template>
  <div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'admin',
    components: {
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

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
    created () {
      var self = this
      this.refreshInterval = setInterval(function () {
        // this.now = this.moment()
        self.updateVirtualClockTime()
        self.updateRealClockTime()
        console.log('Interval running in admin')
      }, 1000)
    },
    destroyed () {
      clearInterval(this.refreshInterval)
    },
    data () {
      return {
        refreshInterval: null,
        virtualClockTime: '-',
        realClockTime: '-'
      }
    },
    computed: {
      ...mapGetters({
        virtualClockSeed: 'virtualClockSeed',
        virtualClockRate: 'virtualClockRate',
        stateChangeTimestamp: 'stateChangeTimestamp',
        message: 'message',
        eventNumber: 'eventNumber'
      })
    },
    methods: {
      updateVirtualClockTime: function () {
        if (this.virtualClockSeed === null || this.stateChangeTimestamp === null) {
          return null
        }
        let now = this.moment()
        let diffRealToNow = now.diff(this.stateChangeTimestamp, 'seconds')
        let adjustedDiffRealToNow = diffRealToNow * (this.virtualClockRate - 1)
        this.virtualClockTime = this.virtualClockSeed.clone().add(adjustedDiffRealToNow, 'seconds')
          .format('DDHHmm[D]MMMYY').toUpperCase()
      },
      updateRealClockTime: function () {
        this.realClockTime = this.moment().format('DDHHmm[D]MMMYY').toUpperCase()
      }
    }
  }
</script>

<style>
</style>

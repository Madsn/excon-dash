<template>
  <div class="hello">
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <h4 class="text-xs-center">Current MSEL #</h4>
          <h1 class="text-xs-center">{{eventNumber}}</h1>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <h4 class="text-xs-center">Ex. clock. Current speed: {{virtualClockRate}}x</h4>
          <h1 class="text-xs-center">{{virtualClockTime}}</h1>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="messageCard">
          <h4 class="text-xs-center">Message from EXCON</h4>
          <h1 class="text-xs-center">{{message}}</h1>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    created () {
      this.$options.sockets.onmessage = (msg) => {
        console.log(msg)
        let payload = JSON.parse(msg.data).payload.data
        console.log(payload)
        this.message = payload.message ? payload.message : '-'
        this.eventNumber = payload.current_event
        this.virtualClockSeed = this.moment(payload.clock_virt_seed, this.moment.ISO_8601)
        this.virtualClockRate = payload.clock_virt_rate
        this.realClockSeed = this.moment(payload.clock_real_seed, this.moment.ISO_8601)
      }

      var self = this
      setInterval(function () {
        console.log('updating ticker')
        // this.now = this.moment()
        self.updateVirtualClockTime()
      }, 1000)
    },
    data () {
      return {
        message: '-',
        eventNumber: '-',
        virtualClockRate: '_',
        virtualClockSeed: null,
        realClockSeed: null,
        virtualClockTime: '-'
      }
    },
    methods: {
      updateVirtualClockTime: function () {
        if (this.virtualClockSeed === null || this.realClockSeed === null) {
          console.log(this.virtualClockSeed)
          console.log(this.realClockSeed)
          return null
        }
        let now = this.moment()
        let diffRealToNow = now.diff(this.realClockSeed, 'seconds')
        console.log(diffRealToNow)
        let adjustedDiffRealToNow = diffRealToNow * (this.virtualClockRate - 1)
        console.log(adjustedDiffRealToNow)
        this.virtualClockTime = this.virtualClockSeed.clone().add(diffRealToNow + adjustedDiffRealToNow, 'seconds').format('HH:mm:ss')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .messageCard {
    padding: 16px 32px 16px 32px;
  }
</style>

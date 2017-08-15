<template>
  <div class="fill-parent">
    <v-layout row wrap>
      <v-flex xs12 md12 lg4 v-if="!limitedView">
        <v-card>
          <h4 class="text-xs-center">Current event #</h4>
          <h2 class="text-xs-center">{{eventNumber}}</h2>
        </v-card>
      </v-flex>
      <excon-virtual-clock-card :limitedView="limitedView"
                                :virtualClockRate="virtualClockRate"
                                :virtualClockTime="virtualClockTime">
      </excon-virtual-clock-card>
      <excon-real-clock-card :limitedView="limitedView"
                             :realClockTime="realClockTime">
      </excon-real-clock-card>
    </v-layout>
    <v-layout row v-if="!limitedView">
      <v-flex xs12 fill-height>
        <v-card>
          <h4 class="text-xs-center">Message from EXCON</h4>
          <h2 class="text-xs-center">{{message}}</h2>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ExconVirtualClockCard from './ExconVirtualClockCard'
  import ExconRealClockCard from './ExconRealClockCard'

  export default {
    name: 'hello',
    components: {
      ExconVirtualClockCard,
      ExconRealClockCard
    },
    created () {
      var self = this
      setInterval(function () {
        // this.now = this.moment()
        self.updateVirtualClockTime()
        self.updateRealClockTime()
      }, 1000)
    },
    destroyed () {
      delete this.$socket.onmessage
    },
    data () {
      return {
        virtualClockTime: '-',
        realClockTime: '-'
      }
    },
    props: [
      'limitedView'
    ],
    computed: {
      ...mapGetters({
        virtualClockSeed: 'virtualClockSeed',
        virtualClockRate: 'virtualClockRate',
        realClockSeed: 'realClockSeed',
        message: 'message',
        eventNumber: 'eventNumber'
      })
    },
    methods: {
      updateVirtualClockTime: function () {
        if (this.virtualClockSeed === null || this.realClockSeed === null) {
          return null
        }
        let now = this.moment()
        let diffRealToNow = now.diff(this.realClockSeed, 'seconds')
        let adjustedDiffRealToNow = diffRealToNow * (this.virtualClockRate - 1)
        this.virtualClockTime = this.virtualClockSeed.clone().add(diffRealToNow + adjustedDiffRealToNow, 'seconds')
          .format('DDHHmm[D]MMMYY').toUpperCase()
      },
      updateRealClockTime: function () {
        this.realClockTime = this.moment().format('DDHHmm[D]MMMYY').toUpperCase()
      }
    }
  }
</script>

<style>
  .flex {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .card {
    padding: 16px 32px 2px 32px;
  }
</style>

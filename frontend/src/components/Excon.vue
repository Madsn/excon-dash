<template>
  <div>
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
    name: 'excon',
    components: {
      ExconVirtualClockCard,
      ExconRealClockCard
    },
    props: [
      'limitedView'
    ],
    computed: {
      ...mapGetters({
        virtualClockTime: 'virtualClockTime',
        virtualClockRate: 'virtualClockRate',
        realClockTime: 'realClockTime',
        message: 'message',
        eventNumber: 'eventNumber'
      })
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

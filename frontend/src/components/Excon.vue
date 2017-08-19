<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md4 lg4 v-if="!limitedView">
        <excon-current-event-card :eventNumber="eventNumber">
        </excon-current-event-card>
      </v-flex>
      <v-flex xs12 md8 lg8 v-if="!limitedView">
        <excon-virtual-clock-card :virtualClockRate="virtualClockRate"
                                  :virtualClockTime="virtualClockTime">
        </excon-virtual-clock-card>
      </v-flex>
      <v-flex xs12 md12 v-else="limitedView">
        <excon-virtual-clock-card :virtualClockRate="virtualClockRate"
                                  :virtualClockTime="virtualClockTime">
        </excon-virtual-clock-card>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!limitedView">
      <excon-message-card :message="message"></excon-message-card>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6 lg8>
        <v-card>
          <h4 class="text-xs-center">Message for all</h4>
          <h2 class="text-xs-center">{{message}}</h2>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <excon-real-clock-card :realClockTime="realClockTime">
        </excon-real-clock-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ExconVirtualClockCard from './ExconVirtualClockCard'
  import ExconRealClockCard from './ExconRealClockCard'
  import ExconCurrentEventCard from './ExconCurrentEventCard'
  import ExconMessageCard from './ExconMessageCard'
  import VCardMedia from 'vuetify/src/components/cards/VCardMedia'

  export default {
    name: 'excon',
    components: {
      VCardMedia,
      ExconVirtualClockCard,
      ExconRealClockCard,
      ExconCurrentEventCard,
      ExconMessageCard
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

<template>
  <div>
    <v-layout row wrap>
      <v-flex md12 lg4 v-if="!limitedView">
        <excon-current-event-card>
        </excon-current-event-card>
      </v-flex>
      <v-flex md12 lg8 v-if="!limitedView">
        <excon-virtual-clock-card>
        </excon-virtual-clock-card>
      </v-flex>
      <v-flex xs12 md12 v-else="limitedView">
        <excon-virtual-clock-card></excon-virtual-clock-card>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!limitedView">
      <excon-message-card :message="message"></excon-message-card>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md6 lg4 offset-lg8>
        <excon-real-clock-card>
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
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'excon',
    components: {
      ExconVirtualClockCard,
      ExconRealClockCard,
      ExconCurrentEventCard,
      ExconMessageCard,
      ExconCardTitle
    },
    props: [
      'limitedView'
    ],
    computed: {
      ...mapGetters({
        message: 'message'
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
    min-height: 184px;
    margin: 0 4px;
  }
</style>

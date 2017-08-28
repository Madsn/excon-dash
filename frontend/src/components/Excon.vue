<template>
  <div>
    <excon-toolbar></excon-toolbar>
    <v-layout row wrap>
      <v-flex md12 lg4 v-if="!limitedView">
        <excon-current-event-card :admin="admin">
        </excon-current-event-card>
      </v-flex>
      <v-flex md12 lg8 v-if="!limitedView">
        <excon-virtual-clock-card :admin="admin">
        </excon-virtual-clock-card>
      </v-flex>
      <v-flex xs12 md12 v-else="limitedView">
        <excon-virtual-clock-card :admin="admin"></excon-virtual-clock-card>
      </v-flex>
    </v-layout>
    <v-layout row v-if="!limitedView">
      <excon-message-card :message="message" :admin="admin"></excon-message-card>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs10 md6 offset-md6 lg4 offset-lg8>
        <excon-real-clock-card>
        </excon-real-clock-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ExconVirtualClockCard from './ExconVirtualClockCard'
  import ExconRealClockCard from './ExconRealClockCard'
  import ExconCurrentEventCard from './ExconCurrentEventCard'
  import ExconMessageCard from './ExconMessageCard'
  import ExconCardTitle from './ExconCardTitle.vue'
  import ExconToolbar from './ExconToolbar.vue'

  export default {
    name: 'excon',
    components: {
      ExconVirtualClockCard,
      ExconRealClockCard,
      ExconCurrentEventCard,
      ExconMessageCard,
      ExconCardTitle,
      ExconToolbar
    },
    props: [
      'limitedView',
      'admin'
    ],
    computed: {
      ...mapGetters({
        message: 'message'
      })
    },
    methods: {
      ...mapActions({
        logout: 'logout'
      }),
      navigateToLimitedView: function () {
        this.$router.push('/')
      },
      navigateToExconView: function () {
        this.$router.push('/excon')
      }
    }
  }
</script>

<style>
  .flex {
    padding-top: 16px;
    padding-bottom: 0;
  }

  .card {
    padding: 16px 32px 2px 32px;
    min-height: 184px;
    margin: 0 4px;
  }
</style>

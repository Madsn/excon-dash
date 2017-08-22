<template>
  <v-card class="elevation-10" v-if="admin">
    <excon-card-title title="Current event #"></excon-card-title>
    <v-card-text>
      <v-layout class="text-xs-center" style="max-height: 73px; margin-top: -24px">
        <v-flex xs-3>
          <v-btn fab dark medium primary @click="decrementEventNumber">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-6>
          <h2 class="text-xs-center">{{eventNumber}}</h2>
        </v-flex>
        <v-flex xs-3>
          <v-btn fab dark medium primary @click="incrementEventNumber">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
        </div>
      </v-layout>
    </v-card-text>
  </v-card>
  <v-card class="elevation-10" v-else="admin">
    <excon-card-title title="Current event #"></excon-card-title>
    <h2 class="text-xs-center">{{eventNumber}}</h2>
  </v-card>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconCurrentEventCard',
    components: {
      ExconCardTitle
    },
    props: [
      'admin'
    ],
    computed: {
      ...mapGetters({
        eventNumber: 'eventNumber'
      })
    },
    methods: {
      ...mapActions({
        decrementEventNumber: 'decrementEventNumber',
        incrementEventNumber: 'incrementEventNumber'
      })
    }
  }
</script>

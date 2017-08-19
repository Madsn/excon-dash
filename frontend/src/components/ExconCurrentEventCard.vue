<template>
  <v-card class="elevation-10">
    <excon-card-title title="Current event #"></excon-card-title>
    <h2 class="text-xs-center">{{eventNumber}}</h2>
  </v-card>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconCurrentEventCard',
    components: {
      ExconCardTitle
    },
    computed: {
      ...mapGetters({
        eventNumber: 'eventNumber'
      })
    }
  }
</script>

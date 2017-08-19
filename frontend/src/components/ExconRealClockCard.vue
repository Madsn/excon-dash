<template>
  <v-card class="elevation-10">
    <excon-card-title title="Real time"></excon-card-title>
    <h2 class="text-xs-center">{{realClockTime}}</h2>
  </v-card>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconRealClockCard',
    computed: {
      ...mapGetters({
        realClockTime: 'realClockTime'
      })
    },
    components: {
      ExconCardTitle
    }
  }
</script>

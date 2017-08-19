<template>
  <v-card>
    <excon-card-title title="Real time"></excon-card-title>
    <h2 class="text-xs-center">{{realClockTime}}</h2>
  </v-card>
</template>
<script>
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconRealClockCard',
    props: [
      'realClockTime'
    ],
    components: {
      ExconCardTitle
    }
  }
</script>

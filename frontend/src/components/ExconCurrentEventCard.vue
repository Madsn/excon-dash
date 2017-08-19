<template>
  <v-card>
    <excon-card-title title="Current event #"></excon-card-title>
    <h2 class="text-xs-center">{{eventNumber}}</h2>
  </v-card>
</template>
<script>
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconCurrentEventCard',
    props: [
      'eventNumber'
    ],
    components: {
      ExconCardTitle
    }
  }
</script>

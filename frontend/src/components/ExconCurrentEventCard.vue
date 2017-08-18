<template>
  <v-card>
    <h4 class="text-xs-center">Current event #</h4>
    <h2 class="text-xs-center">{{eventNumber}}</h2>
  </v-card>
</template>
<script>
  export default {
    name: 'ExconCurrentEventCard',
    props: [
      'eventNumber'
    ]
  }
</script>

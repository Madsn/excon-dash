<template>
  <v-flex xs12 md6 lg4 v-if="!limitedView">
    <v-card>
      <h4 class="text-xs-center">Real time</h4>
      <h2 class="text-xs-center">{{realClockTime}}</h2>
    </v-card>
  </v-flex>
  <v-flex xs12 md6 v-else>
    <v-card>
      <h4 class="text-xs-center">Real time</h4>
      <h2 class="text-xs-center">{{realClockTime}}</h2>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    name: 'ExconRealClockCard',
    props: [
      'limitedView',
      'realClockTime'
    ]
  }
</script>

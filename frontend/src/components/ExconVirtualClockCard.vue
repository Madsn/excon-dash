<template>
  <v-flex xs12 md6 lg4 v-if="!limitedView">
    <v-card>
      <h4 class="text-xs-center">Exercise time, speed: <b>{{virtualClockRate}}x</b></h4>
      <h2 class="text-xs-center">{{virtualClockTime}}</h2>
    </v-card>
  </v-flex>
  <v-flex xs12 md6 v-else="limitedView">
    <v-card>
      <h4 class="text-xs-center">Exercise time, speed: <b>{{virtualClockRate}}x</b></h4>
      <h2 class="text-xs-center">{{virtualClockTime}}</h2>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    name: 'ExconVirtualClockCard',
    props: [
      'limitedView',
      'virtualClockRate',
      'virtualClockTime'
    ]
  }
</script>

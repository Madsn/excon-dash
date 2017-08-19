<template>
  <v-card>
    <h4 class="text-xs-center">Real time</h4>
    <h2 class="text-xs-center">{{realClockTime}}</h2>
  </v-card>
</template>
<script>
  export default {
    name: 'ExconRealClockCard',
    props: [
      'realClockTime'
    ]
  }
</script>

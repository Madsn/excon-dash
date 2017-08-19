<template>
    <v-card>
      <h4 class="text-xs-center">Exercise time, speed: <b>{{virtualClockRate}}x</b></h4>
      <h2 class="text-xs-center">{{virtualClockTime}}</h2>
    </v-card>
</template>
<script>
  export default {
    name: 'ExconVirtualClockCard',
    props: [
      'virtualClockRate',
      'virtualClockTime'
    ]
  }
</script>

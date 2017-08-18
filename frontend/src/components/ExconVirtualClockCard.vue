<template>
  <b-card header="Exercise time, speed:">
    <h2 class="text-xs-center">{{virtualClockTime}}</h2>
  </b-card>
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

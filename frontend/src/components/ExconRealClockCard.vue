<template>
  <b-card header="Real time">
    <h2 class="text-xs-center">{{realClockTime}}</h2>
  </b-card>
</template>
<script>
  export default {
    name: 'ExconRealClockCard',
    props: [
      'realClockTime'
    ]
  }
</script>

<template>
  <div>
    <h4 class="text-xs-center">Real time</h4>
    <h2 class="text-xs-center">{{realClockTime}}</h2>
  </div>
</template>
<script>
  export default {
    name: 'ExconRealClockCard',
    props: [
      'realClockTime'
    ]
  }
</script>

<template>
  <div>
    <h4 class="text-xs-center">Current event #</h4>
    <h2 class="text-xs-center">{{eventNumber}}</h2>
  </div>
</template>
<script>
  export default {
    name: 'ExconCurrentEventCard',
    props: [
      'eventNumber'
    ]
  }
</script>

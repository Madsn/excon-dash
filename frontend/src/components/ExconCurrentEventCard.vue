<template>
  <b-card header="Current event #">
    <p>{{eventNumber}}</p>
  </b-card>
</template>
<script>
  export default {
    name: 'ExconCurrentEventCard',
    props: [
      'eventNumber'
    ]
  }
</script>

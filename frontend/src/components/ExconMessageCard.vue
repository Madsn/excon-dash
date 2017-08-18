<template>
  <b-card header="Message from EXCON">
      <h2 class="text-xs-center">{{message}}</h2>
  </b-card>
</template>
<script>
  export default {
    name: 'ExconMessageCard',
    props: [
      'message'
    ]
  }
</script>

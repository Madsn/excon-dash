<template>
  <!--<v-flex xs12 fill-height>-->
  <div>
    <div>
      <h4 class="text-xs-center">Message from EXCON</h4>
      <h2 class="text-xs-center">{{message}}</h2>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ExconMessageCard',
    props: [
      'message'
    ]
  }
</script>

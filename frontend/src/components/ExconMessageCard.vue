<template>
  <v-flex xs12 fill-height>
    <v-card>
      <h4 class="text-xs-center">Message from EXCON</h4>
      <h2 class="text-xs-center">{{message}}</h2>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    name: 'ExconMessageCard',
    props: [
      'message'
    ]
  }
</script>

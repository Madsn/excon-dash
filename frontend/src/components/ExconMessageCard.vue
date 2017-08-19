<template>
  <v-flex xs12 fill-height>
    <v-card>
      <excon-card-title title="Message from EXCON"></excon-card-title>
      <h2 class="text-xs-center">{{message}}</h2>
    </v-card>
  </v-flex>
</template>
<script>
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconMessageCard',
    props: [
      'message'
    ],
    components: {
      ExconCardTitle
    }
  }
</script>

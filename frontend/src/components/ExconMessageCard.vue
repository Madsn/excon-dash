<template>
  <v-flex xs12 fill-height>
    <v-card class="elevation-10">
      <excon-card-title title="Message from EXCON"></excon-card-title>
      <h2 class="text-xs-center">{{message}}</h2>
    </v-card>
  </v-flex>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconMessageCard',
    computed: {
      ...mapGetters({
        message: 'message'
      })
    },
    components: {
      ExconCardTitle
    }
  }
</script>

<template>
  <v-flex xs12 fill-height>
    <v-card class="elevation-10">
      <div class="display-3 grey--text text--darken-1 text-xs-center">Message from EXCON
      </div>
      <h2 class="text-xs-center">{{message}}</h2>
    </v-card>
  </v-flex>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconMessageCard',
    props: [
      'admin'
    ],
    computed: {
      ...mapGetters({
        message: 'message'
      })
    },
    components: {
      ExconCardTitle
    },
    methods: {
      ...mapActions({
        setMessage: 'setMessage'
      })
    }
  }
</script>

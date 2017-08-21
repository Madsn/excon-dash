<template>
  <v-flex xs12 fill-height>
    <v-card class="elevation-10">
      <excon-card-title title="Message from EXCON"></excon-card-title>
      <v-btn fab dark medium primary @click="setMessageText">
        <v-icon>edit</v-icon>
      </v-btn>
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
      }),
      setMessageText: function () {
        this.setMessage('testing')
      }
    }
  }
</script>

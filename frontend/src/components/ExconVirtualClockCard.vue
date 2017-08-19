<template>
  <v-card class="elevation-10">
    <excon-card-title :title="cardTitle"></excon-card-title>
    <h2 class="text-xs-center">{{virtualClockTime}}</h2>
  </v-card>
</template>
<script>
  import ExconCardTitle from './ExconCardTitle.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ExconVirtualClockCard',
    computed: {
      ...mapGetters({
        virtualClockTime: 'virtualClockTime',
        virtualClockRate: 'virtualClockRate'
      }),
      cardTitle: function () {
        return `Exercise time, speed: ${this.virtualClockRate}x`
      }
    },
    components: {
      ExconCardTitle
    }
  }
</script>

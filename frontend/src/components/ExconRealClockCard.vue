<template>
  <v-card class="elevation-10">
    <excon-card-title :title="labelArabic" :subtitle="labelEnglish"></excon-card-title>
    <h2 class="text-xs-center">{{realClockTime}}</h2>
  </v-card>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconRealClockCard',
    computed: {
      ...mapGetters({
        realClockTime: 'realClockTime'
      }),
      labelArabic: function () {
        return this.$i18n.t('message.realTimeLabel', 'ar')
      },
      labelEnglish: function () {
        return this.$i18n.t('message.realTimeLabel', 'en')
      }
    },
    components: {
      ExconCardTitle
    }
  }
</script>

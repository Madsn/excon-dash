<template>
  <v-card class="elevation-10">
    <div class="display-3 grey--text text--darken-1 text-xs-center">{{cardTitle}}
      <v-dialog v-model="dialog" lazy absolute width="640" v-if="admin">
        <v-btn fab dark medium primary slot="activator" style="margin-top: -16px">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
          <v-card-text>
            <v-date-picker v-model="selectedDate" actions landscape style="margin-bottom: 4px"></v-date-picker>
            <v-time-picker v-model="selectedTime" landscape format="24hr"></v-time-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Cancel</v-btn>
            <v-btn class="blue--text darken-1" flat @click="submitVirtualClock" @click.native="dialog = false">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <h2 class="text-xs-center">{{virtualClockTime}}</h2>
  </v-card>
</template>
<script>
  import ExconCardTitle from './ExconCardTitle.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ExconVirtualClockCard',
    props: [
      'admin'
    ],
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
    },
    created: function () {
      let now = this.moment()
      this.selectedTime = now.format('HH:mm')
      this.selectedDate = now
      console.log(this.selectedDate)
    },
    data () {
      return {
        dialog: false,
        selectedDate: null,
        selectedTime: null
      }
    },
    methods: {
      ...mapActions({
        setMessage: 'setMessage',
        setVirtualClock: 'setVirtualClock'
      }),
      submitVirtualClock: function () {
        var newDate = this.moment(`${this.selectedDate} ${this.selectedTime}`)
        this.setVirtualClock(newDate)
      }
    }
  }
</script>

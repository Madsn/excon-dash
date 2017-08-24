<template>
  <v-card class="elevation-10">
    <div class="display-3 grey--text text--darken-1 text-xs-center">Ex. time, speed:
      <v-btn fab dark medium primary @click="decrementClockSpeedClicked" class="clock-speed-adjuster" v-if="admin">
        <v-icon>remove</v-icon>
      </v-btn>
      {{virtualClockRate}}x
      <v-btn fab dark medium primary @click="incrementClockSpeedClicked" class="clock-speed-adjuster" v-if="admin">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
    <h2 class="text-xs-center">{{virtualClockTime}}
      <v-dialog v-model="dialog" lazy absolute width="640" v-if="admin" style="margin-bottom: -9px">
        <v-btn fab dark medium primary slot="activator" @click.native="resetPickerValues" style="margin-top: -20px">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
          <v-card-text>
            <v-date-picker v-model="selectedDate" actions landscape :autosave="false"
                           style="margin-bottom: 4px"></v-date-picker>
            <v-time-picker v-model="selectedTime" landscape :autosave="false" format="24hr"></v-time-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="cancelVirtualClockChange" @click.native="dialog = false">
              Cancel
            </v-btn>
            <v-btn class="blue--text darken-1" flat @click="submitVirtualClock" @click.native="dialog = false">Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </h2>
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
      this.resetPickerValues()
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
        setVirtualClock: 'setVirtualClock',
        incrementClockSpeed: 'incrementClockSpeed',
        decrementClockSpeed: 'decrementClockSpeed'
      }),
      submitVirtualClock: function () {
        var newDate = this.moment(`${this.selectedDate} ${this.selectedTime}`)
        this.setVirtualClock(newDate)
      },
      cancelVirtualClockChange: function () {
        this.resetPickerValues()
      },
      resetPickerValues: function () {
        let now = this.moment()
        this.selectedTime = now.format('HH:mm')
        this.selectedDate = now
      },
      decrementClockSpeedClicked: function () {
        this.decrementClockSpeed()
      },
      incrementClockSpeedClicked: function () {
        console.log('test')
        this.incrementClockSpeed()
      }
    }
  }
</script>

<style>
  .clock-speed-adjuster {
    margin-top: -6px;
  }
</style>

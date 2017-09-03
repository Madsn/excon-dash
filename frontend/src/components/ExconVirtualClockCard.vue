<template>
  <v-card class="elevation-10">
    <div class="display-3 grey--text text--darken-1 text-xs-center">
      <v-btn fab icon dark medium primary @click="decrementClockSpeedClicked" class="clock-speed-adjuster"
             v-if="admin" :disabled="!socketConnected">
        <v-icon>remove</v-icon>
      </v-btn>
      {{virtualClockRate}}
      <v-btn fab icon dark medium primary @click="incrementClockSpeedClicked" class="clock-speed-adjuster"
             v-if="admin" :disabled="!socketConnected">
        <v-icon>add</v-icon>
      </v-btn>
      <span>:{{$t("message.virtualClockLabel", "ar")}}</span>
    </div>
    <div class="display-5 grey--text text--darken-1 text-xs-center card-subtitle">
      {{$t("message.virtualClockLabel", "en")}} {{virtualClockRate}}
    </div>
    <h2 class="text-xs-center">{{virtualClockTime}}
      <v-btn fab icon dark medium primary @click.native.stop="openTimePicker" style="margin-top: -2px"
             v-if="admin" :disabled="!socketConnected">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" lazy absolute width="640" v-if="admin" class="mt-1">
        <v-card>
          <v-card-text>
            <v-date-picker v-model="selectedDate" actions landscape :autosave="false"
                           style="margin-bottom: 4px"></v-date-picker>
            <v-time-picker v-model="selectedTime" landscape :autosave="false" format="24hr"></v-time-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="closeTimePicker">
              Cancel
            </v-btn>
            <v-btn class="blue--text darken-1" flat @click="submitVirtualClock"
                   @click.native="closeTimePicker" :disabled="!socketConnected">
              Save
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
    data () {
      const self = this
      return {
        dialog: false,
        selectedDate: null,
        selectedTime: null,
        escapeHandler: function (event) {
          if (event.keyCode === 27) {
            self.closeTimePicker()
          }
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('keyup', this.escapeHandler)
    },
    methods: {
      ...mapActions({
        setMessage: 'setMessage',
        setVirtualClock: 'setVirtualClock',
        incrementClockSpeed: 'incrementClockSpeed',
        decrementClockSpeed: 'decrementClockSpeed'
      }),
      submitVirtualClock: function () {
        const newDate = this.moment(`${this.selectedDate} ${this.selectedTime}`)
        this.setVirtualClock(newDate)
      },
      openTimePicker: function () {
        this.dialog = true
        let now = this.moment()
        this.selectedTime = now.format('HH:mm')
        this.selectedDate = now
        window.addEventListener('keyup', this.escapeHandler)
      },
      closeTimePicker: function () {
        this.dialog = false
        window.removeEventListener('keyup', this.escapeHandler)
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

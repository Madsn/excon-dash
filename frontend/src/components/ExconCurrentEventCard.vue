<template>
  <v-card class="elevation-10" v-if="admin">
    <div class="display-3 grey--text text--darken-1 text-xs-center">Current event #
      <v-btn fab primary dark medium @click.native="beginEditingEvent" class="edit-message-button">
        <v-icon>edit</v-icon>
      </v-btn>
    </div>
    <v-card-text v-if="editingEvent">
      <v-text-field name="new-event-input"
      ></v-text-field>
    </v-card-text>
    <v-card-text v-else>
      <v-layout class="text-xs-center" style="max-height: 73px; margin-top: -24px">
        <v-flex xs-3>
          <v-btn fab dark medium primary @click="decrementEventNumber">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-6>
          <h2 class="text-xs-center">{{eventNumber}}</h2>
        </v-flex>
        <v-flex xs-3>
          <v-btn fab dark medium primary @click="incrementEventNumber">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
        </div>
      </v-layout>
    </v-card-text>
  </v-card>
  <v-card class="elevation-10" v-else="admin">
    <excon-card-title title="Current event #"></excon-card-title>
    <h2 class="text-xs-center">{{eventNumber}}</h2>
  </v-card>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import ExconCardTitle from './ExconCardTitle.vue'

  export default {
    name: 'ExconCurrentEventCard',
    components: {
      ExconCardTitle
    },
    props: [
      'admin'
    ],
    computed: {
      ...mapGetters({
        eventNumber: 'eventNumber'
      })
    },
    data: function () {
      return {
        editingEvent: false
      }
    },
    methods: {
      ...mapActions({
        decrementEventNumber: 'decrementEventNumber',
        incrementEventNumber: 'incrementEventNumber'
      }),
      beginEditingEvent: function () {
        this.editingEvent = true
      }
    }
  }
</script>
<style>
  input[name='new-event-input'] {
    font-size: 56px;
    padding-bottom: 32px;
    padding-top: 24px;
  }
</style>

<template>
  <v-card class="elevation-10" v-if="admin">
    <div class="display-3 grey--text text--darken-1 text-xs-center">{{currentEventLabel}}
      <span v-if="admin">
        <v-btn fab primary dark medium @click.native="beginEditingEvent" class="edit-message-button"
               v-if="!editingEvent">
          <v-icon>edit</v-icon>
        </v-btn>
        </v-btn>
        <v-btn fab error dark medium @click.native="editingEvent = false" class="edit-message-button"
               v-if="editingEvent">
          <v-icon>cancel</v-icon>
        </v-btn>
        <v-btn fab success dark medium @click.native="submitNewEvent" class="edit-message-button" v-if="editingEvent">
          <v-icon>save</v-icon>
        </v-btn>
      </span>
    </div>
    <v-card-text v-if="editingEvent">
      <v-text-field name="new-event-input"
                    class="event-input"
                    v-model="newEventNumber"
                    type="number"
                    autofocus
                    @keyup.enter="submitNewEvent"
                    @keyup.esc="editingEvent = false"
      ></v-text-field>
    </v-card-text>
    <v-card-text v-else>
      <v-layout class="event-admin-view">
        <v-flex xs-3 class="text-xs-right">
          <v-btn fab dark medium primary @click="decrementEventNumber">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-6>
          <h2 class="text-xs-center">{{eventNumber}}</h2>
        </v-flex>
        <v-flex xs-3 class="text-xs-left">
          <v-btn fab dark medium primary @click="incrementEventNumber">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
        </div>
      </v-layout>
    </v-card-text>
  </v-card>
  <v-card class="elevation-10" v-else>
    <excon-card-title :title="currentEventLabelArabic" :subtitle="currentEventLabelEnglish"></excon-card-title>
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
      }),
      currentEventLabelEnglish: function () {
        return this.$i18n.t('message.currentEventLabel', 'en')
      },
      currentEventLabelArabic: function () {
        return this.$i18n.t('message.currentEventLabel', 'ar')
      }
    },
    data: function () {
      return {
        editingEvent: false,
        newEventNumber: null
      }
    },
    methods: {
      ...mapActions({
        decrementEventNumber: 'decrementEventNumber',
        incrementEventNumber: 'incrementEventNumber',
        setEventNumber: 'setEventNumber'
      }),
      beginEditingEvent: function () {
        this.newEventNumber = this.eventNumber
        this.editingEvent = true
      },
      submitNewEvent: function () {
        this.setEventNumber(this.newEventNumber)
        this.editingEvent = false
      }
    }
  }
</script>
<style>
  input[name='new-event-input'] {
    font-size: 56px;
    padding-bottom: 32px;
    padding-top: 24px;
    text-align: center;
  }

  .event-input {
    padding: 0;
    margin: 0 0 -18px 0;
  }

  .event-admin-view {
    max-height: 73px;
    margin-top: -24px;
  }
</style>

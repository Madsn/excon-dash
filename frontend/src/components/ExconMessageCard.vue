<template>
  <v-flex xs12 fill-height>
    <v-card class="elevation-10">
      <div class="display-3 grey--text text--darken-1 text-xs-center">Message from EXCON
        <v-btn fab primary dark medium @click.native="beginEditingMessage" style="margin-top: -8px" v-if="!editingMessage">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab error dark medium @click.native="editingMessage = false" style="margin-top: -8px" v-if="editingMessage">
          <v-icon>cancel</v-icon>
        </v-btn>
        <v-btn fab success dark medium @click.native="editingMessage = false" style="margin-top: -8px" v-if="editingMessage">
          <v-icon>save</v-icon>
        </v-btn>
      </div>
      <h2 class="text-xs-center" v-if="!editingMessage">{{message}}</h2>
      <v-text-field v-if="admin && editingMessage"
                    name="new-message-input"
                    v-model="newMessage"
                    :max="maxMessageLength"
                    :maxlength="maxMessageLength"
                    rows="2"
                    multi-line
                    counter
      ></v-text-field>
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
    data () {
      return {
        editingMessage: false,
        maxMessageLength: 128,
        newMessage: ''
      }
    },
    components: {
      ExconCardTitle
    },
    methods: {
      ...mapActions({
        setMessage: 'setMessage'
      }),
      beginEditingMessage: function () {
        this.newMessage = this.message
        this.editingMessage = true
      }
    }
  }
</script>

<style>
  textarea[name='new-message-input'] {
    font-size: 56px;
  }
</style>

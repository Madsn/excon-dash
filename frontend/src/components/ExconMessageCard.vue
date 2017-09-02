<template>
  <v-flex xs12 fill-height>
    <v-card class="elevation-10">
      <div class="display-3 grey--text text--darken-1 text-xs-center">{{$t("message.exconMessageLabel", "ar")}}
        <span v-if="admin">
          <v-btn icon fab primary dark medium @click.native="beginEditingMessage" class="edit-message-button"
                 v-if="!editingMessage" :disabled="!socketConnected">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn fab error dark medium @click.native="editingMessage = false" class="edit-message-button"
                 v-if="editingMessage" :disabled="!socketConnected">
            <v-icon>cancel</v-icon>
          </v-btn>
          <v-btn fab success dark medium @click.native="submitNewMessage" class="edit-message-button"
                 v-if="editingMessage" :disabled="!socketConnected">
            <v-icon>save</v-icon>
          </v-btn>
        </span>
      </div>
      <div class="display-5 grey--text text--darken-1 text-xs-center card-subtitle">
        {{$t("message.exconMessageLabel", "en")}}
      </div>
      <h2 class="text-xs-center" v-if="!editingMessage">{{message}}</h2>
      <v-text-field v-if="admin && editingMessage"
                    name="new-message-input"
                    v-model="newMessage"
                    :max="maxMessageLength"
                    :maxlength="maxMessageLength"
                    rows="3"
                    multi-line
                    counter
                    autofocus
                    @keydown.enter="submitNewMessage"
                    @keyup.esc="editingMessage = false"
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
        message: 'message',
        socketConnected: 'socketConnected'
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
      },
      submitNewMessage: function () {
        this.setMessage(this.newMessage)
        this.editingMessage = false
      }
    }
  }
</script>

<style>
  textarea[name='new-message-input'] {
    font-size: 56px;
    text-align: center;
  }

  .edit-message-button {
    margin-top: -8px;
  }
</style>

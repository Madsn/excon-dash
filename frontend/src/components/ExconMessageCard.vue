<template>
  <v-flex xs12 fill-height>
    <v-card class="elevation-10">
      <div class="display-3 grey--text text--darken-1 text-xs-center">Message from EXCON
        <v-btn fab primary dark medium @click.native="editingMessage = true" style="margin-top: -8px" v-if="!editingMessage">
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
                    name="input-7-1"
                    :value="message"
                    multi-line
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
        editingMessage: false
      }
    },
    components: {
      ExconCardTitle
    },
    methods: {
      ...mapActions({
        setMessage: 'setMessage'
      })
    }
  }
</script>

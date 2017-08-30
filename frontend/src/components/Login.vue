<template>
  <div>
    <excon-toolbar></excon-toolbar>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
        <v-card class="logincard elevation-10">
          <v-card-title>
            <div class="headline">
              Admin login
            </div>
          </v-card-title>
          <v-card-text>
            <v-text-field
              name="password-field"
              label="Password"
              id="inputPassword"
              v-model="password"
              type="password"
              :error-messages="passwordErrorMessages"
              @keydown="clearPasswordErrors"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn flat primary @click="login">Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ExconToolbar from './ExconToolbar.vue'

  export default {
    name: 'login',
    components: {
      ExconToolbar
    },
    data () {
      return {
        username: 'admin',
        password: null,
        passwordErrorMessages: []
      }
    },
    mounted: function () {
      if (this.isAuthenticated) {
        this.$router.push('/admin')
      }
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'isAuthenticated'
      })
    },
    methods: {
      login: function () {
        const self = this
        this.getAuthToken({username: this.username, password: this.password})
          .then(() => {
            self.$router.push('/admin')
            this.passwordErrorMessages = []
          }, ({response}) => {
            if (response.status === 400) {
              this.passwordErrorMessages = ['Invalid password']
            }
          })
      },
      clearPasswordErrors: function () {
        this.passwordErrorMessages = []
      },
      ...mapActions([
        'getAuthToken'
      ])
    }
  }
</script>
<style>
  .logincard .card__text {
    padding-bottom: 0;
    padding-top: 0;
  }

  .logincard .input-group {
    padding-bottom: 0;
  }
</style>

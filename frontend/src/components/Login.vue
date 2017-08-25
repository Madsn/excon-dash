<template>
  <div>
    <input v-model="username" id="inputUsername" class="form-control" :placeholder="loginUsernameLabel"
           aria-describedby="username-addon">
    <input v-model="email" id="inputEmail" class="form-control" placeholder="Email - xxx@systematic.com"
           aria-describedby="email-addon">
    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password"
           aria-describedby="password-addon">
    <div class="form-group" v-if="registering">
      <button class="btn btn-md btn-danger" @click="login" type="submit">Cancel</button>
      <button class="btn btn-md btn-primary" @click="signUp">Submit</button>
    </div>
    <div class="form-group" v-else>
      <button class="btn btn-md btn-secondary" @click="signUp">Register</button>
      <button class="btn btn-md btn-primary" @click="login">Sign in</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'login',
    data () {
      return {
        registering: false,
        username: null,
        password: null,
        email: null
      }
    },
    computed: {
      loginUsernameLabel: function () {
        return this.registering ? 'Username' : 'Username or email'
      },
      ...mapGetters({
        isAuthenticated: 'isAuthenticated'
      })
    },
    methods: {
      signUp: function () {
        this.registering = true
      },
      login: function () {
        this.getAuthToken({username: this.username, password: this.password})
        this.registering = false
      },
      ...mapActions([
        'getAuthToken'
      ])
    }
  }
</script>

<template>
  <div>
    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password"
           aria-describedby="password-addon">
    <div class="form-group">
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
        username: 'admin',
        password: null
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
        this.getAuthToken({username: this.username, password: this.password}).then(() => {
          self.$router.push('/admin')
          console.log(self.$router)
          console.log('got auth token')
        })
      },
      ...mapActions([
        'getAuthToken'
      ])
    }
  }
</script>

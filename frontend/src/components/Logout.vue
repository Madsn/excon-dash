<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'logout',
    data: function () {
      return {
        msg: 'You are now logged out'
      }
    },
    mounted: function () {
      this.logout()
      this.$router.push('/')
    },
    methods: {
      ...mapActions([
        'logout'
      ])
    }
  }
</script>

<template>
  <v-app light>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-snackbar
      secondary
      bottom
      vertical
      v-model="serverConnectivityWarning"
    >
      <span>
        <v-icon error class="pr-2">warning</v-icon>Connection to server lost. Reconnecting...
      </span>
    </v-snackbar>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        socketConnected: 'socketConnected'
      }),
      serverConnectivityWarning: function () {
        return !this.socketConnected
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main.styl'
</style>

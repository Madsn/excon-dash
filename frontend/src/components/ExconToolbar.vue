<template>
  <v-toolbar>
    <img src="/static/systematic_logo.png" height="34px" @click="$router.push('limited')"/>
    <v-toolbar-title>Exercise Dash</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="isAuthenticated">
      <v-btn flat to="admin">Admin</v-btn>
      <v-btn flat to="excon">Full</v-btn>
      <v-btn flat to="limited">Limited</v-btn>
      <v-btn flat to="logout">Log out</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn flat to="limited">Dashboard</v-btn>
      <v-btn flat to="login">Admin</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ExconToolbar',
    computed: {
      ...mapGetters({
        isAuthenticated: 'isAuthenticated'
      })
    }
  }
</script>

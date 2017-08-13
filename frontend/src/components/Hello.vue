<template>
  <div class="hello">
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <h4 class="text-xs-center">Current MSEL #</h4>
          <h1 class="text-xs-center">{{eventNumber}}</h1>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <h4 class="text-xs-center">Ex. clock. Current speed: {{virtualClockRate}}x</h4>
          <h1 class="text-xs-center">{{virtualClockTime}}</h1>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card class="messageCard">
          <h1 class="text-xs-center">{{message}}</h1>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      message: 'This is a test message, what should the length limit be for this type of message?',
      eventNumber: 123,
      virtualClockRate: 10,
      virtualClockTime: '11:47:13'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messageCard {
  padding: 16px 32px 16px 32px;
}
</style>

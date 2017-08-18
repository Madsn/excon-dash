<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <excon-current-event-card :eventNumber="eventNumber">
        </excon-current-event-card>
      </div>
      <div class="col-md-6">
        <excon-virtual-clock-card :virtualClockRate="virtualClockRate"
                                  :virtualClockTime="virtualClockTime">
        </excon-virtual-clock-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <excon-message-card :message="message"></excon-message-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <b-card header="Message for all">
          <h2 class="text-xs-center">{{message}}</h2>
        </b-card>
      </div>
      <div class="col-md-6">
        <excon-real-clock-card :realClockTime="realClockTime">
        </excon-real-clock-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ExconVirtualClockCard from './ExconVirtualClockCard'
  import ExconRealClockCard from './ExconRealClockCard'
  import ExconCurrentEventCard from './ExconCurrentEventCard'
  import ExconMessageCard from './ExconMessageCard'

  export default {
    name: 'excon',
    components: {
      ExconVirtualClockCard,
      ExconRealClockCard,
      ExconCurrentEventCard,
      ExconMessageCard
    },
    props: [
      'limitedView'
    ],
    computed: {
      ...mapGetters({
        virtualClockTime: 'virtualClockTime',
        virtualClockRate: 'virtualClockRate',
        realClockTime: 'realClockTime',
        message: 'message',
        eventNumber: 'eventNumber'
      })
    }
  }
</script>

<style>
  .card {
    min-height: 132px;
    margin-top: 10px;
  }
</style>

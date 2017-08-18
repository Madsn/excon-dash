<template>
    <div>
      <h4 class="text-xs-center">Exercise time, speed: <b>{{virtualClockRate}}x</b></h4>
      <h2 class="text-xs-center">{{virtualClockTime}}</h2>
    </div>
</template>
<script>
  export default {
    name: 'ExconVirtualClockCard',
    props: [
      'virtualClockRate',
      'virtualClockTime'
    ]
  }
</script>

<template>
  <div>
    <div class="display-3 grey--text text--darken-1 text-xs-center">{{title}}</div>
    <div class="display-5 grey--text text--darken-1 text-xs-center" style="margin-top: -18px" v-if="subtitle">
      {{subtitle}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExconCardTitle',
    props: [
      'title',
      'subtitle'
    ]
  }
</script>

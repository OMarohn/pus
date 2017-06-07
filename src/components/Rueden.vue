<template>
  <div class="rueden">
    <loader v-if="loading"></loader>
    <rueden-liste :rasse="$route.params.rasse"></rueden-liste>
  </div>
</template>

<script>
  import RuedenListe from './RuedenListe'
  import Loader from './Loader.vue'
  export default {
    data () {
      return {
        loading: false
      }
    },
    components: {RuedenListe, Loader}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

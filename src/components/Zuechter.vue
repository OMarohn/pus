<template>
  <div class="zuechter">
    <h4>Züchter!</h4>
    <rueden-liste :rasse="$route.params.rasse"></rueden-liste>
  </div>
</template>

<script>
  import RuedenListe from './RuedenListe'
  export default {
    components: {RuedenListe}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

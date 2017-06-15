<template>
  <div class="zuechter">
    <h4>Züchter!</h4>
    <zuechter-liste :rasse="$route.params.rasse"></zuechter-liste>
  </div>
</template>

<script>
  import ZuechterListe from './ZuechterListe'
  export default {
    components: {ZuechterListe}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

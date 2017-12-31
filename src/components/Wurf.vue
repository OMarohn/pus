<template>
  <div class="wuerfe">
    <wurf-liste :rasse="$route.params.rasse"></wurf-liste>
  </div>
</template>

<script>
  import WurfListe from './WurfListe'
  export default {
    components: {WurfListe}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

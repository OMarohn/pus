<template>
  <div class="rueden">
    <rueden-liste :rasse="$route.params.rasse"></rueden-liste>
  </div>
</template>

<script>
  import RuedenListe from './RuedenListe'
  export default {
    components: {RuedenListe},
    computed: {
      cmsg: () => {
        console.log(this.$route)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

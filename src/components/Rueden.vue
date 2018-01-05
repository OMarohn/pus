<template>
  <div class="rueden">
    <loader v-if="loading"></loader>
    <rueden-liste :rasse="$route.params.rasse"></rueden-liste>
    <div id="satz" class="col-xl-10 offset-xl-1 col-sm-12">
      <div class="card cart-rueden">
        <div class="card-header">
          <h4>Hier aufgenommen sind Rüden, deren Züchter und/oder Eigentümer Mitglied der Landesgruppe-Nord sind.</h4>
        </div>
      </div>
    </div>
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
  #satz {
    margin-top: 3rem;
    text-align: center;
  }
</style>

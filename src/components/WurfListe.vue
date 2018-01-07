<template>
  <div class="welpen">
    <div v-if="wuerfe.wurfListe.length > 0" href="#wurf" class="wurfListe">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <h4>Gefallen</h4>
      </div>
      <div v-for="wurf in wuerfe.wurfListe" class="row container-fluid wurfCart">
        <div class="col-xl-10 offset-xl-1 col-sm-12">
          <wurf-info :wurf="wurf"></wurf-info>
        </div>
      </div>
    </div>

    <div v-if="wuerfe.wurfErwartungListe.length > 0" href="#wurferwartung" class="wurfListe">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <h4>Erwartungen</h4>
      </div>
      <div v-for="wurf in wuerfe.wurfErwartungListe" class="row container-fluid wurfCart">
        <div class="col-xl-10 offset-xl-1 col-sm-12">
          <wurf-info :wurf="wurf"></wurf-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WurfInfo from './WurfInfo.vue'

  export default {
    name: 'wurfListe',
    props: ['rasse'],
    computed: {
      wuerfe () {
        if (this.$store) {
          console.log(this.$store, this.rasse)
          const wuerfe = this.$store.getters.getWuerfe
          if (wuerfe.hasOwnProperty(this.rasse)) {
            const wurfRasse = wuerfe[this.rasse]
            return {wurfListe: wurfRasse[0], wurfErwartungListe: wurfRasse[1]}
          }
        }
      }
    },
    components: {WurfInfo}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-header h4 {
    width:100%;
    text-align: left;
  }

  .wurfCart {
    margin-bottom: 0.5rem;
  }
</style>

<template>
  <div class="welpen">
    <loader v-if="loading"></loader>

    <div v-if="wurfListe.length > 0" href="#wurf" class="wurfListe">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <h4>Gefallen</h4>
      </div>
      <div v-for="wurf in wurfListe" class="row container-fluid wurfCart">
        <div class="col-xl-10 offset-xl-1 col-sm-12">
          <wurf-info :wurf="wurf"></wurf-info>
        </div>
      </div>
    </div>

    <div v-if="wurfErwartungListe.length > 0" href="#wurferwartung" class="wurfListe">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <h4>Erwartungen</h4>
      </div>
      <div v-for="wurf in wurfErwartungListe" class="row container-fluid wurfCart">
        <div class="col-xl-10 offset-xl-1 col-sm-12">
          <wurf-info :wurf="wurf"></wurf-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loader from './Loader.vue'
  import WurfInfo from './WurfInfo.vue'

  export default {
    name: 'wurfListe',
    props: ['rasse'],
    data () {
      return {
        loading: true,
        wurfListe: [],
        wurfErwartungListe: []
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      // Laden der Wurf-Daten - vielleicht doch besser alle einmal laden und dann filtern?
      fetchData () {
        axios.get('static/data/welpen/' + this.rasse + '.json')
          .then(response => {
            this.wurfListe = []
            this.wurfErwartungListe = []
            for (let i = 0; i < response.data.length; i++) {
              const wurf = response.data[i]
              if (wurf.hasOwnProperty('gefallen')) {
                this.wurfListe.push(wurf)
              } else {
                this.wurfErwartungListe.push(wurf)
              }
            }
          })
          .catch(e => {
            console.error(e)
            this.news = []
          })
        this.loading = false
      }
    },
    components: {Loader, WurfInfo}
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

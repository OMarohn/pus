<template>
  <!-- DECKRUEDEN -->
  <div href="#rueden" id="rueden" class="container-fluid ruedenListe">
    <div class="row">
      <div v-for="ruede in ruedenListe" class="col-md-4">
        <div class="card card-outline-secondary">
          <div class="card-header"><h4 v-html="ruede.name"></h4></div>
          <div class="card-block">
            <img class="img-fluid" :src="ruede.url">
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ZB-Nr.: {{ruede.zuchtbuch}}</li>
            <li class="list-group-item">Wurftag: {{ruede.wurftag}}</li>
            <li class="list-group-item">
              <div class="card-sub-header">Titel:</div>
              <property-tag :props="ruede.titel"></property-tag>
            </li>
            <li v-if="ruede" class="list-group-item">Prüfungen: <property-tag :props="ruede.leistung"></property-tag></li>
            <li class="list-group-item">Vater: {{ruede.vater}}</li>
            <li class="list-group-item">Mutter: {{ruede.mutter}}</li>
            <li class="list-group-item">Formwert: {{ruede.formwert}}</li>
            <li class="list-group-item">HD: {{ruede.hd}}</li>
            <li class="list-group-item">PRA/rcd4: {{ruede.pra}}</li>
            <li class="list-group-item">Zahnstatus: {{ruede.zahnstatus}}</li>
            <li class="list-group-item">Zuchttauglichkeit: {{ruede.ztp}}</li>
            <li class="list-group-item">Züchter: {{ruede.breeder}}</li>
            <li class="list-group-item">Besitzer: {{ruede.besitzer}}<br>{{ruede.besitzerStrasse}}<br>{{ruede.besitzerOrt}}<br><br></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- DECKRUEDEN Ende -->
</template>

<script>
  import axios from 'axios'
  import PropertyTag from './PropertyTag'

  export default {
    name: 'ruedenListe',
    props: ['rasse'],
    components: {PropertyTag},
    data () {
      return {
        ruedenListe: []
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      // Laden der Daten zur Rasse
      fetchData () {
        console.log(this.rasse)
        axios.get('static/data/rueden/' + this.rasse + '.json')
          .then(response => {
            this.ruedenListe = response.data
            console.log(this.ruedenListe)
          })
          .catch(e => {
            console.error(e)
            this.ruedenListe = []
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #rueden {
    padding-top: 2rem;
  }
  #rueden > div > div > div > img{
    max-height: 300px;
    padding-bottom: 1rem;
  }
  /**
  div .card-sub-header {
    position: relative;
    top: -12px;
    left: -20px;
    width: 100%;
    background-color: aquamarine !important;
  }
  **/
</style>

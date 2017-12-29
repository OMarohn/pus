<template>
  <div v-if="zuechterListe.length == 0">Keine Daten vorhanden.</div>
  <div v-else="zuechterListe.length > 0" href="#zuechter" class="zuechterListe row container-fluid">
    <div v-for="breeder in zuechterListe" class="breeder-card col-md-6 col-sm-12">
      <div class="card">
        <div class="card-header">
          <h4 v-html="breeder.kennelName"></h4>
        </div>
        <div class="card-block">
          <div class="kennel-img-container">
            <img class="img-fluid kennel-img" :src="breeder.url">
            <transition appear appear-to-class="animated rubberBand">
              <div class="breeder-contact">
                <a v-if="breeder.mail" :href="'mailto:' + breeder.mail" class="btn btn-outline-success"><i class="fa fa-envelope-o fa-fw"></i></a>
                <a v-if="breeder.fon" :href="'tel:' + breeder.fon | phoneAsLink" class="btn btn-outline-success"><i class="fa fa-phone fa-fw"></i></a>
                <a v-if="breeder.web" :href="'http://' + breeder.web" target="vater" class="btn btn-outline-success"><i class="fa fa-external-link fa-fw"></i></a>
              </div>
            </transition>
          </div>
          <div class="">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Besitzer:<br>
                <div class="breeder-anschrift">
                  <div v-if="breeder.kontakt">{{breeder.kontakt}}</div>
                  <div v-if="breeder.strasse">{{breeder.strasse}}</div>
                  <div v-if="breeder.ort">{{breeder.ort}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import PropertyTag from './PropertyTag'

  // Auslagern
  function shuffle (array) {
    var currentIndex = array.length
    var temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  export default {
    name: 'zuechterListe',
    props: ['rasse'],
    components: {PropertyTag},
    data () {
      return {
        zuechterListe: []
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
        axios.get('static/data/kennel/' + this.rasse + '.json')
          .then(response => {
            this.zuechterListe = shuffle(response.data)
          })
          .catch(e => {
            console.error(e)
            this.zuechterListe = []
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-header h4 {
    width:100%;
    text-align: left;
  }

  .breeder-contact {
    padding-top: 0.5rem;
  }

  .breeder-anschrift {
    text-align: left;
    padding-left: 1rem;
    min-height: 4.5rem;
  }

  .kennel-img-container {
    height: 24rem;
  }

  .kennel-img {
    width: auto;
    max-height: 20rem;
  }

  .breeder-card {
    padding-bottom: 1rem;
  }
</style>

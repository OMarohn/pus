<template>
  <div v-if="ruedenListe.length == 0">Keine Daten vorhanden.</div>
  <div v-else="ruedenListe.length > 0" href="#rueden" class="ruedenListe">
    <div v-for="ruede in ruedenListe" class="row container-fluid">
      <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 v-html="ruede.name"></h4>
        </div>
        <div class="card-block">
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <img class="img-fluid" :src="ruede.url">
              <transition appear appear-to-class="animated rubberBand">
                <div class="ruede-contact">
                  <a v-if="ruede.mail" :href="'mailto:' + ruede.mail" class="btn btn-outline-success" data-toggle="tooltip" data-placement="top" :data-original-titel="ruede.mail"><i class="fa fa-envelope-o fa-fw"></i></a>
                  <a v-if="ruede.fon" :href="'tel:' + ruede.fon | phoneAsLink" class="btn btn-outline-success"><i class="fa fa-phone fa-fw"></i></a>
                  <a v-if="ruede.web" :href="'http://' + ruede.web" target="vater" class="btn btn-outline-success"><i class="fa fa-external-link fa-fw"></i></a>
                  <a v-if="ruede.urlPedegree" :href="ruede.urlPedegree" target="pedegree" class="btn btn-outline-success"><i class="fa fa-file-pdf-o fa-fw"></i></a>
                </div>
              </transition>
            </div>
            <div class="col-md-4 col-sm-12">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">ZB-Nr.: {{ruede.zuchtbuch}}</li>
                <li v-if="ruede.wurftag" class="list-group-item">Wurftag: {{ruede.wurftag}} (<timeago :since="convDate(ruede.wurftag)"></timeago>)</li>
                <li v-if="ruede.titel" class="list-group-item">
                  <div class="card-sub-header">Titel:</div>
                  <property-tag :props="ruede.titel"></property-tag>
                </li>
                <li v-if="ruede.leistung" class="list-group-item">Prüfungen: <property-tag :props="ruede.leistung"></property-tag></li>
              </ul>
            </div>
            <div class="col-md-4 col-sm-12">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Vater: {{ruede.vater}}</li>
                <li class="list-group-item">Mutter: {{ruede.mutter}}</li>
                <li class="list-group-item">Formwert: {{ruede.formwert}}</li>
                <li class="list-group-item">HD: {{ruede.hd}}</li>
                <li class="list-group-item">PRA/rcd4: {{ruede.pra}}</li>
                <li class="list-group-item">Zahnstatus: {{ruede.zahnstatus}}</li>
                <li class="list-group-item">Zuchttauglichkeit: {{ruede.ztp}}</li>
                <li class="list-group-item">Züchter: {{ruede.breeder}}</li>
                <li class="list-group-item">Besitzer:<br>
                  <div class="ruede-anschrift">
                    <div v-if="ruede.besitzer">{{ruede.besitzer}}</div>
                    <div v-if="ruede.besitzerStrasse">{{ruede.besitzerStrasse}}</div>
                    <div v-if="ruede.besitzerOrt">{{ruede.besitzerOrt}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import PropertyTag from './PropertyTag'

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
      convDate (d) {
        if (d) {
          var parts = d.split('.')
          if (parts.length === 3) {
            d = parts[1] + '.' + parts[0] + '.' + parts[2]
          }
          console.log(parts)
        }
        return d
      },
      // Laden der Daten zur Rasse
      fetchData () {
        console.log(this.rasse)
        axios.get('static/data/rueden/' + this.rasse + '.json')
          .then(response => {
            this.ruedenListe = shuffle(response.data)
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
  .card-header h4 {
    width:100%;
    text-align: left;
  }

  .ruede-contact {
    padding-top: 0.5rem;
  }

  .ruede-anschrift {
    text-align: left;
    padding-left: 1rem;
  }
</style>

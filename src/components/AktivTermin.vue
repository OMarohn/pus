<template>
  <div class="aktivTermin">
    <loader v-if="loading"></loader>

    <div id="inhalt" class="card-deck">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <div class="card">
          <div class="card-block">
           <div v-if="showHeader" class="card-header">
              <button @click="toggel(0)" class="btn" v-bind:class="{ 'btn-outline-secondary': !types[0], 'btn-outline-success' : types[0]}" >
                <i class="fa fa-graduation-cap fa-fw" data-toggle="tooltip" data-placement="top" title="Prüfung"></i>
              </button>
              <button @click="toggel(1)" class="btn" v-bind:class="{ 'btn-outline-secondary': !types[1], 'btn-outline-success' : types[1]}">
                <i class="fa fa-trophy fa-fw" data-toggle="tooltip" data-placement="top" title="Ausstellung"></i>
              </button>
              <button @click="toggel(2)" class="btn" v-bind:class="{ 'btn-outline-secondary': !types[2], 'btn-outline-success' : types[2]}">
                <i class="fa fa-calendar fa-fw" data-toggle="tooltip" data-placement="top" title="sonstiger Termin"></i>
              </button>
          </div>
           <table class="table table-responsive table-striped table-bordered">
            <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Datum</th>
              <th scope="col">Veranstaltung</th>
              <th scope="col">Ort</th>
              <th scope="col">Meldeschluss</th>
              <th scope="col">Info</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(theDate, index) in filteredTermine">
              <td scope="row">
                <i v-if="theDate.typ === 'Pruefung'" class="fa fa-graduation-cap fa-fw" data-toggle="tooltip" data-placement="top" title="Prüfung"></i>
                <i v-if="theDate.typ === 'Ausstellung'" class="fa fa-trophy fa-fw" data-toggle="tooltip" data-placement="top" title="Ausstellung"></i>
                <i v-if="theDate.typ === 'Sonstiges'" class="fa fa-calendar fa-fw" data-toggle="tooltip" data-placement="top" title="sonstiger Termin"></i>
              </td>
              <td>{{displayDatum(theDate)}}</td>
              <td>
                {{theDate.event}}
                <div v-if="theDate.hasOwnProperty('eventLang')">
                  {{theDate.eventLang}}
                </div>
              </td>
              <td>{{theDate.ort}}</td>
              <td>{{theDate.meldeschluss}}</td>
              <td>
                <div class="propTag" v-if="theDate.pruefungen">
                  <property-tag :props="theDate.pruefungen"></property-tag>
                </div>
                <div v-if="theDate.richter">
                  Richter/in: {{theDate.richter}}
                </div>
                {{theDate.info}}
                <div v-if="theDate.hasOwnProperty('ausschreibung')">
                  <a data-toggle="tooltip" data-placement="top" title="Ausschreibungsunterlagen" :href="'static/doc/' + theDate.ausschreibung" target="ausschreibung" class="btn btn-outline-success btn-sm">
                    <i class="fa fa-file-pdf-o fa-fw"></i><span>Ausschreibung</span>
                  </a>
                </div>
                <div v-if="theDate.hasOwnProperty('einladung')">
                  <a data-toggle="tooltip" data-placement="top" title="Einladung" :href="'static/doc/' + theDate.einladung" target="einladung" class="btn btn-outline-success btn-sm">
                    <i class="fa fa-file-pdf-o fa-fw"></i><span>Einladung</span>
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loader from './Loader.vue'
  import PropertyTag from './PropertyTag'

  export default {
    data () {
      return {
        loading: true,
        termine: [],
        showHeader: true,
        types: [true, true, true]
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    computed: {
      filteredTermine: function () {
        let result = []

        for (let i = 0; i < this.termine.length; i++) {
          if (this.termine[i] !== undefined) {
            let item = this.termine[i]
            if (item.typ === 'Pruefung' && this.types[0]) {
              result.push(item)
            }
            if (item.typ === 'Ausstellung' && this.types[1]) {
              result.push(item)
            }
            if (item.typ === 'Sonstiges' && this.types[2]) {
              result.push(item)
            }
          }
        }

        return result
      }
    },
    methods: {
      // Laden der News-Daten
      fetchData () {
        // filter auswerten
        if (this.$route.query.hasOwnProperty('filter')) {
          let params = this.$route.query.filter.split(',')
          this.types = [JSON.parse(params[0]), JSON.parse(params[1]), JSON.parse(params[2])]
          this.showHeader = false
        } else {
          // hier ggf noch alles auf wieder sichtbar stellen
          this.showHeader = true
        }
        // Daten schon geladen?
        if (this.termine.length === 0) {
          axios.get('static/data/aktuell/newsdate.json')
            .then(response => {
              // Hack, geht davon aus das das aktuelle Jahr immer oben steht @todo auslagern nach vuex
              this.termine = response.data[0].termine.sort((a, b) => {
                return new Date(this.convDate(a.datum)) - new Date(this.convDate(b.datum))
              })
            })
            .catch(e => {
              console.error(e)
              this.termine = []
            })
          this.loading = false
        }
      },
      convDate (datum) { // doublette @todo Auslagern nach vuex
        if (datum) {
          var parts = datum.split('.')
          if (parts.length === 3) {
            datum = parts[1] + '/' + parts[0] + '/' + parts[2]
          }
        }
        return datum
      },
      displayDatum: function (item) {
        return (item.hasOwnProperty('datumLang') ? item.datumLang : item.datum)
      },
      toggel: function (idx) {
        this.types[idx] = !this.types[idx]
        this.types = [...this.types]
      }
    },
    components: {Loader, PropertyTag}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #inhalt {
    text-align: left;
    margin-bottom: 2rem;
  }

  p {
    font-family: Verdana;
    font-size: large;
    text-align: justify;
  }

  div a {
    margin-top: 0.3rem;
    text-align: left;
    width: 8rem;
  }

  .propTag > span {
    margin-left: -0.25rem;
  }
</style>

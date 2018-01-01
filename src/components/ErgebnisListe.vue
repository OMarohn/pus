<template>
  <div class="ergebnisListe">
    <loader v-if="loading"></loader>

    <div id="inhalt" class="card-deck">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <div class="card">
          <table class="table table-responsive table-striped table-bordered">
            <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Datum</th>
              <th scope="col">Veranstaltung</th>
              <th scope="col">Ort</th>
              <th v-if="anzeigeModus == 'Pruefung'" scope="col">Prüfungen</th>
              <th v-if="anzeigeModus == 'Ausstellung'" scope="col">Richter</th>
              <th scope="col">Ergebnisse</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(theDate, index) in filteredTermine">
              <td scope="row">
                <i v-if="anzeigeModus === 'Pruefung'" class="fa fa-graduation-cap fa-fw" data-toggle="tooltip" data-placement="top" title="Prüfung"></i>
                <i v-if="anzeigeModus === 'Ausstellung'" class="fa fa-trophy fa-fw" data-toggle="tooltip" data-placement="top" title="Ausstellung"></i>
              </td>
              <td>{{displayDatum(theDate)}}</td>
              <td>{{theDate.event}}</td>
              <td>{{theDate.ort}}</td>
              <td>
                <div v-if="anzeigeModus === 'Pruefung'">
                  <property-tag :props="theDate.pruefungen"></property-tag>
                </div>
                <div v-if="anzeigeModus === 'Ausstellung'">
                  {{theDate.richter}}
                </div>
              </td>
              <td>
                <div v-if="theDate.hasOwnProperty('ergebnis')">
                  <a data-toggle="tooltip" data-placement="top" title="Ergebnisse" :href="'static/doc/' + theDate.ergebnis" target="ergebnis" class="btn btn-outline-success btn-sm">
                    <i class="fa fa-file-pdf-o fa-fw"></i><span>Ergebnisse</span>
                  </a>
                </div>
                <div v-if="theDate.hasOwnProperty('bericht')">
                  <a data-toggle="tooltip" data-placement="top" title="Bericht" :href="'static/doc/' + theDate.bericht" target="bericht" class="btn btn-outline-success btn-sm">
                    <i class="fa fa-file-pdf-o fa-fw"></i><span>Bericht</span>
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
</template>

<script>
  import axios from 'axios'
  import Loader from './Loader.vue'
  import PropertyTag from './PropertyTag'

  export default {
    data () {
      return {
        loading: true,
        anzeigeModus: 'Pruefung',
        termine: []
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
            if (item.typ === 'Pruefung' && this.anzeigeModus === 'Pruefung') {
              result.push(item)
            }
            if (item.typ === 'Ausstellung' && this.anzeigeModus === 'Ausstellung') {
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
        if (this.$route.query.hasOwnProperty('mode')) {
          let param = this.$route.query.mode
          console.log(param)
          if (param === '0') {
            this.anzeigeModus = 'Pruefung'
          } else if (param === '1') {
            this.anzeigeModus = 'Ausstellung'
          } else {
            console.error('Anzeigemodus ist nicht bekannt!')
          }
        } else { // default
          this.anzeigeModus = 'Pruefung'
        }
        // Daten schon geladen?
        if (this.termine.length === 0) {
          axios.get('static/data/aktuell/newsdate.json')
            .then(response => {
              this.termine = response.data.sort((a, b) => {
                return new Date(a.datum) - new Date(b.datum)
              })
            })
            .catch(e => {
              console.error(e)
              this.termine = []
            })
          this.loading = false
        }
      },
      displayDatum: function (item) {
        return (item.hasOwnProperty('datumLang') ? item.datumLang : item.datum)
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
    width: 7rem;
  }
</style>

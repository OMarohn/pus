<template>
  <div class="ergebnisListe">
    <loader v-if="loading"></loader>

    <div id="inhalt" class="card-deck">
      <div v-for="jahr in jahre" class="col-xl-10 offset-xl-1 col-sm-12">
        <ergebnis-liste-info :termine = "jahr.termine" :modus="anzeigeModus" :titel="jahr.jahr"></ergebnis-liste-info>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loader from './Loader.vue'
  import PropertyTag from './PropertyTag'
  import ErgebnisListeInfo from './ErgebnisListeInfo'

  export default {
    data () {
      return {
        loading: true,
        anzeigeModus: 'Pruefung',
        termine: [],
        jahre: []
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      // Laden der News-Daten
      fetchData () {
        // filter auswerten
        if (this.$route.query.hasOwnProperty('mode')) {
          let param = this.$route.query.mode
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
        if (this.jahre.length === 0) {
          axios.get('static/data/aktuell/newsdate.json')
            .then(response => {
              this.jahre = []
              for (let i = 0; i < response.data.length; i++) {
                let jahr = {jahr: response.data[i].jahr, termine: []}
                jahr.termine = response.data[i].termine.sort((a, b) => {
                  return new Date(this.convDate(a.datum)) - new Date(this.convDate(b.datum))
                })
                this.jahre.push(jahr)
              }
            })
            .catch(e => {
              console.error(e)
              this.jahre = []
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
      }
    },
    components: {Loader, PropertyTag, ErgebnisListeInfo}
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

<template>
  <div class="aktivTermin">
    <loader v-if="loading"></loader>

    <div id="inhalt" class="card-deck">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <div class="card">
        <table class="table table-dark table-striped table-bordered">
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
          <tr v-for="(theDate, index) in termine">
            <td scope="row">
              <i v-if="theDate.typ === 'Pruefung'" class="fa fa-graduation-cap fa-fw" data-toggle="tooltip" data-placement="top" title="Prüfung"></i>
              <i v-if="theDate.typ === 'Ausstellung'" class="fa fa-trophy fa-fw" data-toggle="tooltip" data-placement="top" title="Ausstellung"></i>
              <i v-if="theDate.typ === 'Sonstiges'" class="fa fa-calendar fa-fw" data-toggle="tooltip" data-placement="top" title="sonstiger Termin"></i>
            </td>
            <td>{{displayDatum(index)}}</td>
            <td>{{theDate.event}}</td>
            <td>{{theDate.ort}}</td>
            <td>{{theDate.meldeschluss}}</td>
            <td>{{theDate.info}}</td>
          </tr>
          </tbody>
        </table>
          <!--
        <div class="card-footer text-center">
          <transition appear appear-to-class="animated rubberBand">
            <div>
              <a class="btn"><i class="fa fa-graduation-cap fa-fw"></i></a>
              <a class="btn"><i class="fa fa-paw fa-fw"></i></a>
            </div>
          </transition>
        </div>
        -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Loader from './Loader.vue'

  export default {
    data () {
      return {
        loading: true,
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
    },
    methods: {
      // Laden der News-Daten
      fetchData () {
        axios.get('static/data/aktuell/newsdate.json')
          .then(response => {
            this.termine = response.data
          })
          .catch(e => {
            console.error(e)
            this.termine = []
          })
        this.loading = false
      },
      displayDatum: function (idx) {
        const item = this.termine[idx]
        if (item.hasOwnProperty('datumLang')) {
          return item.datumLang
        } else {
          return item.datum
        }
      }
    },
    components: {Loader}
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
</style>

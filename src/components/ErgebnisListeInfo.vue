<template>
    <div class="card">
      <div class="card-block">
        <h4 class="card-title">{{titel}}</h4>
        <table class="table table-responsive table-striped table-bordered">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Datum</th>
          <th scope="col">Veranstaltung</th>
          <th scope="col">Ort</th>
          <th v-if="modus == 'Pruefung'" scope="col">Prüfungen</th>
          <th v-if="modus == 'Ausstellung'" scope="col">Richter</th>
          <th scope="col">Ergebnisse</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="theDate in filteredTermine">
          <td scope="row">
            <i v-if="modus === 'Pruefung'" class="fa fa-graduation-cap fa-fw" data-toggle="tooltip" data-placement="top" title="Prüfung"></i>
            <i v-if="modus === 'Ausstellung'" class="fa fa-trophy fa-fw" data-toggle="tooltip" data-placement="top" title="Ausstellung"></i>
          </td>
          <td>{{displayDatum(theDate)}}</td>
          <td>{{theDate.event}}</td>
          <td>{{theDate.ort}}</td>
          <td>
            <div v-if="modus === 'Pruefung'">
              <property-tag :props="theDate.pruefungen"></property-tag>
            </div>
            <div v-if="modus === 'Ausstellung'">
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
</template>

<script>
  import PropertyTag from './PropertyTag'

  export default {
    name: 'ergebnis-listeinfo',
    props: ['termine', 'modus', 'titel'],
    computed: {
      filteredTermine: function () {
        let result = []

        for (let i = 0; i < this.termine.length; i++) {
          if (this.termine[i] !== undefined) {
            let item = this.termine[i]
            if (item.typ === 'Pruefung' && this.modus === 'Pruefung') {
              result.push(item)
            }
            if (item.typ === 'Ausstellung' && this.modus === 'Ausstellung') {
              result.push(item)
            }
          }
        }
        return result
      }
    },
    methods: {
      displayDatum: function (item) {
        return (item.hasOwnProperty('datumLang') ? item.datumLang : item.datum)
      }
    },
    components: {PropertyTag}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

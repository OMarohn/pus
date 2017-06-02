<template>
  <!-- DECKRUEDEN -->
  <div href="#rueden" id="rueden" class="container-fluid ruedenListe">
    <div class="row">
      <div class="col-md-4">
        <div class="card card-outline-secondary">
          <div class="card-header"><h4><b>Kir Royal</b> vom Rosenhof</h4></div>
          <div class="card-block">
            <img class="img-fluid" src="static/rueden/gordon/kir_royal.jpg" alt="Card image cap">
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ZB-Nr.: GKC 3048VDH/DGSZ/08/2450</li>
            <li class="list-group-item">Wurftag: 19.05.2008</li>
            <li class="list-group-item">Titel: Dt.Ch. (VDH), Int.Sch.Ch  (FCI), Club Ch.</li>
            <li class="list-group-item">Prüfungen: JAP, HAP,  Int. Derby (Solo) (GSCD)  Int. Field Trial (Solo) (GSCD),  JS (Solo) (GSCD),  AZP,  BP, Btr, GT solo</li>
          </ul>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-outline-secondary">
          <div class="card-header"><h4>Coachman's <b>Rebel of Bavaria</b></h4></div>
          <div class="card-block">
            <img class="img-fluid" src="static/rueden/gordon/rebel.jpg" alt="Card image cap">
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ZB-Nr.: GS 11/188</li>
            <li class="list-group-item">Wurftag: 16.11.2011</li>
            <li class="list-group-item">Titel: Dt.Ch. (VDH), Dt.Sch.Ch, LS Hessen Pfalz Saar,LS Rheinland-Pfalz, Ch Intern. d'Exposition (FCI), CH. Intern. de Beauté (FCI), Öst.Ch (ÖKV)</li>
            <li class="list-group-item">Prüfungen: JUS, JUSH, JAP GSCD, HAP GSCD, HJS, ES, AZP, BrP, AH, VGP</li>
          </ul>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-outline-secondary">
          <div class="card-header"><h4><b>Elton John</b> von Wersabe</h4></div>
          <div class="card-block">
            <img class="img-fluid" src="static/rueden/gordon/elton_john.jpg" alt="Card image cap">
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ZB-Nr.: VDH/DPSZ GS 07/069</li>
            <li class="list-group-item">Wurftag: 04.05.2007</li>
            <li class="list-group-item">Titel: Dt.Ch. (VDH), Int.Sch.Ch.</li>
            <li class="list-group-item">Prüfungen: JuS, JuSH, HZP mlE, BP</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- DECKRUEDEN Ende -->
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ruedenListe',
    props: ['rasse'],
    data () {
      return {
        ruedenListe: []
      }
    },
    created: () => {
      axios.get('static/data/rueden/gordon.json')
        .then(response => {
          // JSON responses are automatically parsed.
          this.ruedenListe = response.data
          console.log(this.ruedenListe)
        })
        .catch(e => {
          this.errors.push(e)
        })
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
</style>

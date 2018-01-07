<template>
  <!-- NAVBAR -->
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img src="../pus_logo.gif" width="30" height="30" class="d-inline-block align-top" alt="">
      Pointer und Setter LG Nord
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- Dropdown Verein // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActive('Vorstand')}">
          <a class="nav-link dropdown-toggle" id="navVerein" data-toggle="dropdown" href="/#/verein">Verein</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#verein/vorstand" :class="{active: isActive('Vorstand')}">Vorstand</a>
          </div>
        </li>
        <!-- Dropdown Aktivitäten // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActiveStartWith('aktiv')}">
          <a class="nav-link dropdown-toggle" id="navAktuelles" data-toggle="dropdown" href="/#/aktiv">Aktivitäten</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#aktiv/aktuell" :class="{active: isActive('aktivAktuell')}">Aktuelles</a>
            <a class="dropdown-item" href="#aktiv/termine" :class="{active: isActive('aktivTermin')}">Termine</a>
          </div>
        </li>
        <!-- Dropdown Welpen // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActive('Wurf')}">
          <a class="nav-link dropdown-toggle" id="navWelpen" data-toggle="dropdown" href="/#/welpen">Welpen</a>
          <div class="dropdown-menu">
            <a v-for="rasse in rassen" class="dropdown-item" :class="{disabled: isWurf(rasse)}" :href="'#wurf/' + rasse | shorten">{{rasse}}</a>
          </div>
        </li>
        <!-- Dropdown Zuechter // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActive('Zuechter')}">
          <a class="nav-link dropdown-toggle" id="navZuechter" data-toggle="dropdown" href="/#/zuechter">Züchter</a>
          <div class="dropdown-menu">
            <a v-for="rasse in rassen" class="dropdown-item" :href="'#zuechter/' + rasse | shorten">{{rasse}}</a>
          </div>
        </li>
        <!-- Dropdown Rueden // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActive('Rueden')}">
          <a class="nav-link dropdown-toggle" id="navRueden" data-toggle="dropdown" href="/#/rueden">Rüden</a>
          <div class="dropdown-menu">
            <a v-for="rasse in rassen" class="dropdown-item" :class="{disabled: isRuede(rasse)}" :href="'#rueden/' + rasse | shorten">{{rasse}}</a>
          </div>
        </li>
        <!-- Dropdown Ausstellungen // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navAusstellung" data-toggle="dropdown" href="/#/austellung">Austellungen</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#aktiv/termine?filter=false,true,false">Termine</a>
            <a class="dropdown-item" href="#ergebnis?mode=1">Ergebnisse</a>
          </div>
        </li>
        <!-- Dropdown Prüfungen // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navPruefung" data-toggle="dropdown" href="/#/pruefung">Prüfungen</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#aktiv/termine?filter=true,false,false">Termine</a>
            <a class="dropdown-item" href="#ergebnis?mode=0">Ergebnisse</a>
            <a class="dropdown-item" target="_" href="/static/doc/meldeformular.pdf">Meldeformular</a>
          </div>
        </li>
        <li class="nav-item" :class="{active: isActive('links')}">
          <a class="nav-link" href="#links">Links</a>
        </li>
        <li class="nav-item" :class="{active: isActive('impressum')}">
          <a class="nav-link" href="#impressum">Impressum</a>
        </li>
      </ul>
    </div>
  </nav>
  <!-- NAVBAR ENDE -->
</template>

<script>
  export default {
    name: 'navBar',
    methods: {
      isWurf (rasse) {
        let ret = false
        const wuerfe = this.$store.getters.getWuerfe
        const rasseShort = rasse.toLowerCase().replace(/\s+/g, '')
        if (wuerfe.hasOwnProperty(rasseShort)) {
          const wuerfeRasse = wuerfe[rasseShort]
          if (wuerfeRasse && wuerfeRasse.length > 0) {
            const anz = (wuerfeRasse[0].length + wuerfeRasse[1].length)
            ret = (anz <= 0)
          }
        }
        return ret
      },
      isRuede (rasse) {
        let ret = false
        const rueden = this.$store.getters.getRueden
        const rasseShort = rasse.toLowerCase().replace(/\s+/g, '')
        if (rueden.hasOwnProperty(rasseShort)) {
          const ruedenRasse = rueden[rasseShort]
          if (ruedenRasse) {
            const anz = (ruedenRasse.length)
            ret = (anz <= 0)
          }
        }
        return ret
      },
      isActive (pfad, params, name) {
        if (params && this.$route.params) {
          console.log(params, this.$route.params[name])
          return (this.$route.name === pfad && params === this.$route.params[0])
        } else {
          return this.$route.name === pfad
        }
      },
      isActiveStartWith (praefix) {
        return this.$route.name.startsWith(praefix)
      }
    },
    data () {
      return {
        rassen: ['Englisch', 'Pointer', 'Gordon', 'Red and White', 'Irish']
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    opacity: 0.8;
  }
</style>

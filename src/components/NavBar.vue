<template>
  <!-- NAVBAR -->
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded fixed-top">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
            <a class="dropdown-item" target="_blank" href="http://www.pointer-und-setter.de/index.php/verein1/vorstand.html" :click="closeNavBar()">Vorstand Hauptverein</a>
            <a class="dropdown-item" href="#verein/vorstand" :class="{active: isActive('Vorstand')}">Vorstand Landesgruppe</a>
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
            <a v-for="rasse in rassen" v-bind:key="rasse.url" class="dropdown-item" :class="{disabled: isWurf(rasse.url)}" :href="'#wurf/' + rasse.url">{{rasse.display}}</a>
          </div>
        </li>
        <!-- Dropdown Zuechter // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActive('Zuechter')}">
          <a class="nav-link dropdown-toggle" id="navZuechter" data-toggle="dropdown" href="/#/zuechter">Züchter</a>
          <div class="dropdown-menu">
            <a v-for="rasse in rassen" v-bind:key="rasse.url" class="dropdown-item" :href="'#zuechter/' + rasse.url">{{rasse.display}}</a>
          </div>
        </li>
        <!-- Dropdown Rueden // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown" :class="{active: isActive('Rueden')}">
          <a class="nav-link dropdown-toggle" id="navRueden" data-toggle="dropdown" href="/#/rueden">Rüden</a>
          <div class="dropdown-menu">
            <a v-for="rasse in rassen" v-bind:key="rasse.url" class="dropdown-item" :class="{disabled: isRuede(rasse.url)}" :href="'#rueden/' + rasse.url">{{rasse.display}}</a>
          </div>
        </li>
        <!-- Dropdown Ausstellungen // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navAusstellung" data-toggle="dropdown" href="/#/ausstellung">Ausstellungen</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#aktiv/termine?filter=false,true,false">Termine</a>
            <a class="dropdown-item" href="#ergebnis?mode=1">Ergebnisse</a>
            <a class="dropdown-item" href="https://macshot.de/vfpus-n/" target="_blank">Online Meldeformular</a>
          </div>
        </li>
        <!-- Dropdown Prüfungen // mit <router-linkt> hats nicht funktioniert! -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navPruefung" data-toggle="dropdown" href="/#/pruefung">Prüfungen</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#aktiv/termine?filter=true,false,false">Termine</a>
            <a class="dropdown-item" href="#ergebnis?mode=0">Ergebnisse</a>
            <a class="dropdown-item" target="_blank" href="static/doc/FB_Nennung_PuS.pdf">Meldeformular</a>
            <a class="dropdown-item" target="_blank" href="http://www.pointer-und-setter.de/images/pdf/pruefung/PO2015.pdf">Prüfungsordnung</a>
          </div>
        </li>
        <li class="nav-item" :class="{active: isActive('links')}">
          <a class="nav-link" href="#links">Links</a>
        </li>
        <li class="nav-item" :class="{active: isActive('impressum')}">
          <a class="nav-link" href="#impressum">Impressum</a>
        </li>
      </ul>

      <!-- Toggle Benachrichtigung -->
      <div v-if="canWebPush === true"  class="form-inline" :class="{webpush: true}">
        <input v-model="webpush" type="checkbox" name="fancy-checkbox-default" id="fancy-checkbox-default" autocomplete="off" />
        <div @click="toogleWebPush()" class="btn-group">
          <label for="fancy-checkbox-default" class="btn btn-default">
            <span class="fa fa-check-circle"></span>
            <span class="fa fa-circle"></span>
          </label>
          <label for="fancy-checkbox-default" class="btn btn-default active">
            Benachrichtigen
          </label>
        </div>
      </div>
    </div>
  </nav>
  <!-- NAVBAR ENDE -->
</template>

<script>
  const publicVapidKey =
    'BLOtz2-0EWy-Z6oPB6P4Nc7kRiOvnNsMp972taSE_dOMlvhiDiz5c4vHVjcrY8-5Fh1nI9azI6BEq9sDL5FcHdo'

  export default {
    name: 'navBar',
    methods: {
      closeNavBar() {
        $("#navbarSupportedContent").collapse("hide");
      },
      isWurf (rasse) {
        let ret = false
        const wuerfe = this.$store.getters.getWuerfe
        if (wuerfe.hasOwnProperty(rasse)) {
          const wuerfeRasse = wuerfe[rasse]
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
        if (rueden.hasOwnProperty(rasse)) {
          const ruedenRasse = rueden[rasse]
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
      },
      urlBase64ToUint8Array (base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4)
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/')

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
      },
      toogleWebPush () {
        let theReg
        navigator.serviceWorker.ready
          .then(reg => {
            theReg = reg
            return reg.pushManager.getSubscription()
          })
          .then(sub => {
            if (sub === null || sub === undefined) {
              // hier bein Anwender nachfragen
              theReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
              }).then(sub => {
                console.log(sub)
                if (sub) {
                  fetch('https://us-central1-fbtest-4354b.cloudfunctions.net/subscription', {
                    method: 'POST',
                    body: JSON.stringify(sub),
                    headers: {
                      'content-type': 'application/json'
                    }
                  }).catch(data => console.error(data))
                }
              })
            } else {
              // sub --> ist bereits vorhanden
              console.log('Sub ist schon da!', sub)
              this.webpush = true
            }
          })
      }
    },
    computed: {
      canWebPush () {
        return 'Pushmanager' in window
      }
    },
    data () {
      return {
        rassen: [
          {
            display: 'English Setter',
            url: 'englisch'},
          {
            display: 'Pointer',
            url: 'pointer'},
          {
            display: 'Gordon Setter',
            url: 'gordon'
          },
          {
            display: 'Red and White Setter',
            url: 'redandwhite'
          },
          {
            display: 'Irish Setter',
            url: 'irish'
          }
        ],
        webpush: false
      }
    },
    created: function () {
      console.log('a is: ' + this.webpush)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    opacity: 0.8;
  }

  .form-inline input[type="checkbox"] {
    display: none;
  }

  .form-inline input[type="checkbox"] + .btn-group > label {
    padding-right: 2px;
    padding-left: 2px;
  }

  .form-inline input[type="checkbox"] + .btn-group > label span {
    width: 20px;
  }

  .form-inline input[type="checkbox"] + .btn-group > label span:first-child {
    display: none;
  }
  .form-inline input[type="checkbox"] + .btn-group > label span:last-child {
    display: inline-block;
  }

  .form-inline input[type="checkbox"]:checked + .btn-group > label span:first-child {
    display: inline-block;
  }
  .form-inline input[type="checkbox"]:checked + .btn-group > label span:last-child {
    display: none;
  }
</style>

<template>
  <div id="satz" class="col-xl-10 offset-xl-1 col-sm-12">
    <form id="meldungform">

      <!-- Daten der Pruefung -->
      <fieldset class="form-group">
        <!-- Prüfungsdaten -->
        <legend>Prüfungsdaten</legend>
        <div class="form-group row">
          <label class="col-sm-4" for="selectpruefung">Prüfungstermin</label>
          <select v-model="selectedPruefung" class="col-sm-8 form-control" id="selectpruefung">
            <option v-for="termin in aktiveTermine" :value="termin">{{termin.event}} - {{termin.datum}}</option>
          </select>
        </div>
        <div class="form-group row">
          <label class="col-sm-4">Datum der Prüfung</label>
          <input class="col-sm-8 form-control" type="text" :value="getPruefungsdatum" name="pruefungsdatum" readonly>
        </div>
        <div class="form-group row">
          <label class="col-sm-4">Ort der Prüfung</label>
          <input class="col-sm-8 form-control" type="text" :value="selectedPruefung.ort" name="pruefungsort" readonly>
        </div>

        <div class="form-group row">
          <label class="col-sm-4" for="selectdisziplin">Prüfung</label>
          <select class="col-sm-8 form-control" name="pruefung" id="selectdisziplin">
            <option v-for="pr in selectedPruefung.pruefungen" :value="pr">{{pr}}</option>
          </select>
        </div>
      </fieldset>

      <!-- Daten des Hundes -->
      <fieldset class="form-group">
        <legend>Daten des Hundes</legend>
        <div class="form-group row">
          <label class="col-sm-4" for="namehund">Name</label>
          <input type="text" class="col-sm-8 form-control" id="namehund" name="hund.name" placeholder="Name des Hundes">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="selectrasse">Rasse</label>
          <select class="col-sm-8 form-control" id="selectrasse" name="hund.rasse">
            <option value="pointer">Pointer</option>
            <option value="gordon">Gordon Setter</option>
            <option value="englisch">English Setter</option>
            <option value="irish">Irish Red Setter</option>
            <option value="rnw">Irish Red and White Setter</option>
          </select>
        </div>

        <div class="row">
          <div class="col-sm-4">Geschlecht</div>
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="hund.geschlecht" id="optionsRadios1" value="ruede">
                Rüde
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="hund.geschlecht" id="optionsRadios2" value="huendin">
                Hündin
              </label>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label for="wurftag" class="col-sm-4 col-form-label">Wurftag</label>
          <input class="col-sm-8 form-control" type="date" id="wurftag" name="hund.wurfdatum">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="zuchtbuch">Zuchtbuch und Zuchtbuchnummer</label>
          <input type="text" class="col-sm-8 form-control" id="zuchtbuch" name="hund.zuchtbuch" placeholder="Zuchtbuch und Zuchtbuchnummer">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="chipnr">Chip- und/oder TätoNr.</label>
          <input type="text" class="col-sm-8 form-control" id="chipnr" name="hund.chip" placeholder="Chip- und/oder TätoNr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="dgstb">DGStB-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="dgstb" name="hund.dgstb" placeholder="DGStB-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="abl">ABL-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="abl" name="hund.abl" placeholder="ABL-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="ll">LL-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="ll" name="hund.ll" placeholder="LL-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="zuechter">Züchter des Hundes mit Wohnort</label>
          <input type="text" class="col-sm-8 form-control" id="zuechter" name="hund.z-anschrift" placeholder="Züchter des Hundes mit Wohnort">
        </div>

        <div class="row">
          <div class="col-sm-4">Prüfung an der lebenden Ente</div>
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="hund.ente" id="optionsRadios3" value="jaente">
                Ja (Zeugnis ist vorzulegen)
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="hund.ente" id="optionsRadios4" value="neinente">
                Nein
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Daten des Vaters -->
      <fieldset class="form-group">
        <legend>Vater des Hundes</legend>
        <div class="form-group row">
          <label class="col-sm-4" for="namehundvater">Name</label>
          <input type="text" class="col-sm-8 form-control" id="namehundvater" name="vater.name" placeholder="Name des Hundes">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="zuchtbuchvater">Zuchtbuch und Zuchtbuchnummer</label>
          <input type="text" class="col-sm-8 form-control" id="zuchtbuchvater" name="vater.zuchtbuch" placeholder="Zuchtbuch und Zuchtbuchnummer">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="dgstbvater">DGStB-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="dgstbvater" name="vater.dgstb" placeholder="DGStB-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="ablvater">ABL-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="ablvater" name="vater.abl" placeholder="ABL-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="llvater">LL-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="llvater" name="vater.ll" placeholder="LL-Nr.">
        </div>
      </fieldset>

      <!-- Daten der Mutter -->
      <fieldset class="form-group">
        <legend>Mutter des Hundes</legend>
        <div class="form-group row">
          <label class="col-sm-4" for="namehundmutter">Name</label>
          <input type="text" class="col-sm-8 form-control" id="namehundmutter" name="mutter.name" placeholder="Name des Hundes">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="zuchtbuchmutter">Zuchtbuch und Zuchtbuchnummer</label>
          <input type="text" class="col-sm-8 form-control" id="zuchtbuchmutter" name="mutter.zuchtbuch" placeholder="Zuchtbuch und Zuchtbuchnummer">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="dgstbmutter">DGStB-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="dgstbmutter" name="mutter.dgstb" placeholder="DGStB-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="ablmutter">ABL-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="ablmutter" name="mutter.abl" placeholder="ABL-Nr.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="llmutter">LL-Nr.</label>
          <input type="text" class="col-sm-8 form-control" id="llmutter" name="mutter.ll" placeholder="LL-Nr.">
        </div>
      </fieldset>

      <!-- Daten Eigentümer -->
      <fieldset class="form-group">
        <legend>Eigentümer des Hundes</legend>
        <div class="form-group row">
          <label class="col-sm-4" for="namebesitzer">Name, Vorname des Eigentümers</label>
          <input type="text" class="col-sm-8 form-control" id="namebesitzer" name="besitzer.name" placeholder="Name, Vorname des Eigentümers">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="ortbesitzer">Adresse, PLZ, Wohnort des Eigentümers</label>
          <input type="text" class="col-sm-8 form-control" id="ortbesitzer" name="besitzer.anschrift" placeholder="Adresse, PLZ, Wohnort des Eigentümers">
        </div>
        <div class="row">
          <div class="col-sm-4">Eigentümer ist Mitglied im Verein fPuS e.V.</div>
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="besitzer.mitglied" id="optionsRadios5" value="jamitglied">
                Ja
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="besitzer.mitglied" id="optionsRadios6" value="neinmitglied">
                Nein
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Daten Hundeführer -->
      <fieldset class="form-group">
        <legend>Daten des Hundeführers</legend>
        <div class="form-group row">
          <label class="col-sm-4" for="namefuehrer">Name, Vorname des Hundeführer</label>
          <input type="text" class="col-sm-8 form-control" id="namefuehrer" name="fuehrer.name" placeholder="Name, Vorname des Eigentümers">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="ortfuehrer">Adresse, PLZ, Wohnort des Hundeführers</label>
          <input type="text" class="col-sm-8 form-control" id="ortfuehrer" name="fuehrer.anschrift" placeholder="Adresse, PLZ, Wohnort des Hundeführers">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="telefonfuehrer">Telefonnummer</label>
          <input type="text" class="col-sm-8 form-control" id="telefonfuehrer" name="fuehrer.fon" placeholder="Telefonnummer">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="emailhundefuehrer">EMail des Hundeführers</label>
          <input type="email" class="col-sm-8 form-control" id="emailhundefuehrer" name="fuehrer.email" placeholder="EMail des Hundeführers">
        </div>
        <div class="row">
          <div class="col-sm-4">Hundeführer ist im Besitz eines gültigen Jagdscheines</div>
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="fuehrer.jagdschein" id="optionsRadios7" value="jajagdschein">
                Ja
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="fuehrer.jagdschein" id="optionsRadios8" value="neinjagdschein">
                Nein
              </label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="jagdscheinnr">Jagdscheinnummer</label>
          <input type="text" class="col-sm-8 form-control" name="fuehrer.jagdschein.nr" id="jagdscheinnr" placeholder="Jagdscheinnummer">
        </div>

        <div class="row">
          <div class="col-sm-4">Hundeführer ist Mitglied im Verein fPuS e.V.</div>
          <div class="col-sm-8">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="fuehrer.mitglied" id="optionsRadios9" value="jafuehrer">
                Ja
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" name="fuehrer.mitglied" id="optionsRadios10" value="neinfuehrer">
                Nein
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Anlagen -->
      <fieldset class="form-group">
        <legend>Anlagen / Nachweise</legend>

        <div class="form-group row">
          <label class="col-sm-4" for="fileente">Nachweis lebende Ente</label>
          <input type="file" class="col-sm-8 form-control-file" name="file.ente" id="fileente" aria-describedby="fileente_a">
          <small id="fileente_a" class="col-sm-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="fileleistungsbuch">Leistungsbuch</label>
          <input type="file" class="col-sm-8 form-control-file" name="file.leistungsbuch" id="fileleistungsbuch" aria-describedby="fileleistungsbuch_a">
          <small id="fileleistungsbuch_a" class="col-sm-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="filepedegree">Pedegree</label>
          <input type="file" class="col-sm-8 form-control-file" name="file.pedegree" id="filepedegree" aria-describedby="filepedegree_a">
          <small id="filepedegree_a" class="col-sm-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
        </div>
      </fieldset>

      <!-- Disclaimer -->
      <fieldset class="form-group">
        <legend>Gültigwerden der Anmeldung</legend>
        Geprüft wird jeweils der zur Zeit gültigen Prüfungsordnung (PuS, FCI, JGHV).
        Die Teilnahme erfolgt ohne jede Haftung seitens des Veranstalters und der Revierinhaber.

        <b>Die Meldung erhält erst mit Zahlung des Nenngeldes ihre Gültigkeit.</b>

        <br><h5>Meldegeldüberweisung an:</h5><br>
        <div>
          Verein für Pointer und Setter e.V. Landesgruppe Nord
          Raiffeisenbank Ichenhausen
          IBAN: DExxx xxxx xxxx xxx
          Swift-Bic: XXXXXXX
        </div>

        Mit seiner Unterschrift erklärt der Anmeldende, auch im Namen des Führers, Züchters oder Eigentümers,
        sofern diese nicht mit dem Anmeldenden identisch sind, dass er mit der Aufnahme seiner Daten (Name und Anschrift)
        sowie der des Hundes in das EDV - System des Vereins und deren Veröffentlichung in öffentlich zugänglichen Publikationen einverstanden ist.
        Der Anmeldende versichert ebenfalls, dass für den oben gemeldeten Hund eine Haftpflichtversicherung besteht.

        <div class="form-group row">
          <label class="col-sm-4" for="zeichnungort">Ort, Datum</label>
          <input type="text" class="col-sm-8 form-control" name="check.ort" id="zeichnungort" placeholder="Ort, Datum">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="gezeichnet">Unterschrift, gez.</label>
          <input type="text" class="col-sm-8 form-control" name="check.signatur" id="gezeichnet" placeholder="Unterschrift, gez.">
        </div>
        <div class="form-group row">
          <label class="col-sm-4" for="gezeichnet">Nachricht</label>
          <textarea class="col-sm-8 form-control" rows=10 id="nachricht" name="check.nachricht" placeholder="Nachricht, Anmerkungen ..."></textarea>
        </div>
      </fieldset>

      <div class="row">
        <button @click="schickeMail" type="button" class="btn btn-outline-primary text-center">Absenden</button>
      </div>

      <!-- Captcha
      <div class="g-recaptcha" data-sitekey="6LezdUAUAAAAAKMU9K9ZMQmL3fkSGI3XRg4kTVDI"></div>
      -->
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        selectedPruefung: {},
        uploadPercentage: 0
      }
    },
    watch: { // @todo Mal pruefen ob ich das auf dauer so brauche
      'aktiverTermin': 'selectPruefung'
    },
    computed: {
      aktiveTermine () {
        if (this.$store) {
          const termine = this.$store.getters.getAktivePTermine
          return termine
        }
      },
      getPruefungsdatum () {
        return (this.selectPruefung.hasOwnProperty('datumLang') ? this.selectedPruefung.datumLang : this.selectedPruefung.datum)
      }
    },
    methods: {
      selectPruefung () {
        this.$store.commit('setAktivePruefung', this.selectedPruefung)
      },
      schickeMail () {
        console.log('Schicke Mail')
        const elform = document.getElementById('meldungform')
        console.log(elform)
        let data = new FormData(elform) // das ist unser Daten-Objekt ...
        const axiosconf = {
          method: 'post',
          url: 'upload.php',
          data: data,
          config: {headers: {'Content-Type': 'multipart/form-data'}},
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            console.log(this.uploadPercentage)
          }.bind(this)
        }

        axios(axiosconf)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (response) {
            console.log(response)
          })
      }
    }
  }
</script>

<style scoped>

</style>

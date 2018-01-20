<template>
  <div class="container">
    <div id="satz" class="col-xl-10 offset-xl-1 col-sm-12">
      <form id="meldungform">

        <!-- Daten der Pruefung -->
        <fieldset class="form-group">
          <!-- Prüfungsdaten -->
          <legend>Prüfungsdaten</legend>
          <div class="form-group row" :class="{'has-danger' : $v.selectedPruefung.$invalid}">
            <label class="col-sm-4 col-form-label" for="selectpruefung">Prüfungstermin</label>
            <select v-model="selectedPruefung" class="col-sm-12 col-md-8 form-control" id="selectpruefung"
                    @blur="$v.selectedPruefung.$touch()"
                    @change="changePruefung">
              <option v-for="termin in aktiveTermine" :value="termin">{{termin.event}} - {{termin.datum}}</option>
            </select>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Datum der Prüfung</label>
            <input class="col-sm-12 col-md-8 form-control" type="text" :value="getPruefungsdatum" name="pruefung.datum" readonly>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Ort der Prüfung</label>
            <input class="col-sm-12 col-md-8 form-control" type="text" :value="selectedPruefung.ort" name="pruefung.ort" readonly>
          </div>

          <div class="form-group row" :class="{'has-danger' : $v.pruefung_disziplin.$invalid}">
            <label class="col-sm-4 col-form-label" for="selectdisziplin">Prüfung</label>
            <select class="col-sm-12 col-md-8 form-control" name="pruefung.disziplin" id="selectdisziplin"
                    v-model="pruefung_disziplin"
                    @blur="$v.pruefung_disziplin.$touch()">
              <option v-for="pr in selectedPruefung.pruefungen" :value="pr">{{pr}}</option>
            </select>
          </div>
        </fieldset>

        <!-- Daten des Hundes -->
        <fieldset class="form-group">
          <legend>Daten des Hundes</legend>
          <div class="form-group row" :class="{'has-danger' : $v.hund_name.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="namehund">Name</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="namehund" name="hund.name" placeholder="Name des Hundes"
                   v-model="hund_name"
                   @blur="$v.hund_name.$touch()">
          </div>

          <div class="form-group row" :class="{'has-danger' : $v.hund_rasse.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="selectrasse">Rasse</label>
            <select class="col-sm-12 col-md-8 form-control" id="selectrasse" name="hund.rasse"
                    v-model="hund_rasse"
                    @blur="$v.hund_rasse.$touch()">
              <option value="pointer">Pointer</option>
              <option value="gordon">Gordon Setter</option>
              <option value="englisch">English Setter</option>
              <option value="irish">Irish Red Setter</option>
              <option value="rnw">Irish Red and White Setter</option>
            </select>
          </div>

          <div class="row" :class="{'has-danger' : $v.hund_geschlecht.$invalid}">
            <label class="col-sm-4 col-form-label">Geschlecht</label>
            <div class="col-sm-12 col-md-8">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="hund.geschlecht" id="optionsRadios1" value="Rüde"
                         v-model="hund_geschlecht"
                         @blur="$v.hund_geschlecht.$touch()">
                  Rüde
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="hund.geschlecht" id="optionsRadios2" value="Hündin"
                         v-model="hund_geschlecht"
                         @blur="$v.hund_geschlecht.$touch()">
                  Hündin
                </label>
              </div>
            </div>
          </div>

          <div class="form-group row" :class="{'has-danger' : $v.hund_wurfdatum.$invalid}">
            <label for="wurftag" class="col-sm-4 col-form-label hidden-sm-down">Wurftag</label>
            <input class="col-sm-12 col-md-8 form-control" type="date" id="wurftag" name="hund.wurfdatum"
                   v-model="hund_wurfdatum"
                   @blur="$v.hund_wurfdatum.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.hund_zuchtbuch.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="zuchtbuch">Zuchtbuch und Zuchtbuchnummer</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="zuchtbuch" name="hund.zuchtbuch" placeholder="Zuchtbuch und Zuchtbuchnummer"
                   v-model="hund_zuchtbuch"
                   @blur="$v.hund_zuchtbuch.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.hund_chip.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="chipnr">Chip- und/oder TätoNr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="chipnr" name="hund.chip" placeholder="Chip- und/oder TätoNr."
                   v-model="hund_chip"
                   @blur="$v.hund_chip.$touch()">
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="dgstb">DGStB-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="dgstb" name="hund.dgstb" placeholder="DGStB-Nr.">
          </div>
          <div class="form-group row has-warning">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="abl">ABL-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="abl" name="hund.abl" placeholder="ABL-Nr.">
          </div>
          <div class="form-group row has-warning">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="ll">LL-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="ll" name="hund.ll" placeholder="LL-Nr.">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.hund_z_anschrift.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="zuechter">Züchter des Hundes mit Wohnort</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="zuechter" name="hund.z-anschrift" placeholder="Züchter des Hundes mit Wohnort"
                   v-model="hund_z_anschrift"
                   @blur="$v.hund_z_anschrift.$touch()">
          </div>

          <div class="row" :class="{'has-danger' : $v.hund_ente.$invalid}">
            <label class="col-sm-12 col-md-4 col-form-label">Prüfung an der lebenden Ente</label>
            <div class="col-sm-12 col-md-8">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="hund.ente" id="optionsRadios3" value="ja"
                         v-model="hund_ente"
                         @blur="$v.hund_ente.$touch()">
                  Ja (Zeugnis ist vorzulegen)
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="hund.ente" id="optionsRadios4" value="nein"
                         v-model="hund_ente"
                         @blur="$v.hund_ente.$touch()">
                  Nein
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Daten des Vaters -->
        <fieldset class="form-group">
          <legend>Vater des Hundes</legend>
          <div class="form-group row" :class="{'has-danger' : $v.vater_name.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="namehundvater">Name</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="namehundvater" name="vater.name" placeholder="Name des Hundes"
                   v-model="vater_name"
                   @blur="$v.vater_name.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.vater_zuchtbuch.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="zuchtbuchvater">Zuchtbuch und Zuchtbuchnummer</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="zuchtbuchvater" name="vater.zuchtbuch" placeholder="Zuchtbuch und Zuchtbuchnummer"
                   v-model="vater_zuchtbuch"
                   @blur="$v.vater_zuchtbuch.$touch()">
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="dgstbvater">DGStB-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="dgstbvater" name="vater.dgstb" placeholder="DGStB-Nr.">
          </div>
          <div class="form-group row has-warning">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="ablvater">ABL-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="ablvater" name="vater.abl" placeholder="ABL-Nr.">
          </div>
          <div class="form-group row has-warning">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="llvater">LL-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="llvater" name="vater.ll" placeholder="LL-Nr.">
          </div>
        </fieldset>

        <!-- Daten der Mutter -->
        <fieldset class="form-group">
          <legend>Mutter des Hundes</legend>
          <div class="form-group row" :class="{'has-danger' : $v.mutter_name.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="namehundmutter">Name</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="namehundmutter" name="mutter.name" placeholder="Name des Hundes"
                   v-model="mutter_name"
                   @blur="$v.mutter_name.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.mutter_zuchtbuch.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="zuchtbuchmutter">Zuchtbuch und Zuchtbuchnummer</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="zuchtbuchmutter" name="mutter.zuchtbuch" placeholder="Zuchtbuch und Zuchtbuchnummer"
                   v-model="mutter_zuchtbuch"
                   @blur="$v.mutter_zuchtbuch.$touch()">
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="dgstbmutter">DGStB-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="dgstbmutter" name="mutter.dgstb" placeholder="DGStB-Nr.">
          </div>
          <div class="form-group row has-warning">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="ablmutter">ABL-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="ablmutter" name="mutter.abl" placeholder="ABL-Nr.">
          </div>
          <div class="form-group row has-warning">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="llmutter">LL-Nr.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="llmutter" name="mutter.ll" placeholder="LL-Nr.">
          </div>
        </fieldset>

        <!-- Daten Eigentümer -->
        <fieldset class="form-group">
          <legend>Eigentümer des Hundes</legend>
          <div class="form-group row" :class="{'has-danger' : $v.besitzer_name.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="namebesitzer">Name, Vorname</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="namebesitzer" name="besitzer.name" placeholder="Name, Vorname des Eigentümers"
                   v-model="besitzer_name"
                   @blur="$v.besitzer_name.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.besitzer_anschrift.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="ortbesitzer">Adresse, PLZ</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="ortbesitzer" name="besitzer.anschrift" placeholder="Adresse, PLZ, Wohnort des Eigentümers"
                   v-model="besitzer_anschrift"
                   @blur="$v.besitzer_anschrift.$touch()">
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-4">Mitglied im Verein fPuS e.V.</div>
            <div class="col-sm-12 col-md-8">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="besitzer.mitglied" id="optionsRadios5" value="ja">
                  Ja
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="besitzer.mitglied" id="optionsRadios6" value="nein">
                  Nein
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <!-- Daten Hundeführer -->
        <fieldset class="form-group">
          <legend>Daten des Hundeführers</legend>
          <div class="form-group row" :class="{'has-danger' : $v.fuehrer_name.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="namefuehrer">Name, Vorname</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="namefuehrer" name="fuehrer.name" placeholder="Name, Vorname des Hundeführers"
                   v-model="fuehrer_name"
                   @blur="$v.fuehrer_name.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.fuehrer_anschrift.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="ortfuehrer">Adresse, PLZ</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="ortfuehrer" name="fuehrer.anschrift" placeholder="Adresse, PLZ, Wohnort des Hundeführers"
                   v-model="fuehrer_anschrift"
                   @blur="$v.fuehrer_anschrift.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.fuehrer_fon.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="telefonfuehrer">Telefonnummer</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" id="telefonfuehrer" name="fuehrer.fon" placeholder="Telefonnummer"
                   v-model="fuehrer_fon"
                   @blur="$v.fuehrer_fon.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.fuehrer_email.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="emailhundefuehrer">EMail</label>
            <input type="email" class="col-sm-12 col-md-8 form-control" id="emailhundefuehrer" name="fuehrer.email" placeholder="EMail des Hundeführers"
                   v-model="fuehrer_email"
                   @blur="$v.fuehrer_email.$touch()">
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-4">Hundeführer ist im Besitz eines gültigen Jagdscheines</div>
            <div class="col-sm-12 col-md-8">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="fuehrer.jagdschein" id="optionsRadios7" value="ja">
                  Ja
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="fuehrer.jagdschein" id="optionsRadios8" value="nein">
                  Nein
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="jagdscheinnr">Jagdscheinnummer</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" name="fuehrer.jagdschein-nr" id="jagdscheinnr" placeholder="Jagdscheinnummer">
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-4">Mitglied im Verein fPuS e.V.</div>
            <div class="col-sm-12 col-md-8">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="fuehrer.mitglied" id="optionsRadios9" value="ja">
                  Ja
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input type="radio" class="form-check-input" name="fuehrer.mitglied" id="optionsRadios10" value="nein">
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
            <label class="col-sm-4 col-form-label hidden-sm-down" for="fileente">Nachweis lebende Ente</label>
            <input type="file" class="col-sm-12 col-md-8 form-control-file" name="file.ente" id="fileente" aria-describedby="fileente_a"
                   @change="checkfile"
            >
            <small id="fileente_a" class="col-sm-12 col-md-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="fileleistungsbuch">Leistungsbuch</label>
            <input type="file" class="col-sm-12 col-md-8 form-control-file" name="file.leistungsbuch" id="fileleistungsbuch" aria-describedby="fileleistungsbuch_a"
                   @change="checkfile"
            >
            <small id="fileleistungsbuch_a" class="col-sm-12 col-md-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="filepedegree">Pedegree</label>
            <input type="file" class="col-sm-12 col-md-8 form-control-file" name="file.pedegree" id="filepedegree" aria-describedby="filepedegree_a"
                   @change="checkfile"
            >
            <small id="filepedegree_a" class="col-sm-12 col-md-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
          </div>
        </fieldset>

        <!-- Disclaimer -->
        <fieldset class="form-group">
          <div id="info">
            <p>Geprüft wird jeweils der zur Zeit gültigen Prüfungsordnung (PuS, FCI, JGHV).</p>
            <p>Teilnahme erfolgt ohne jede Haftung seitens des Veranstalters und der Revierinhaber.</p>
            <p>Die Meldung erhält erst mit Zahlung des Nenngeldes ihre Gültigkeit.</p>
            <div id="bank"class="text-center">
              <h4>Meldegeldüberweisung an:</h4>
              <div>
                <p>Verein für Pointer und Setter e.V. Landesgruppe Nord </p>
                <br>
                <p>IBAN: <strong>DE97 2555 1480 0313 5949 88</strong></p>
                <p>BIC: <strong>NOLADE21SHG</strong></p>
              </div>
            </div>
            <p>
              Mit seiner Unterschrift erklärt der Anmeldende, auch im Namen des Führers, Züchters oder Eigentümers,
              sofern diese nicht mit dem Anmeldenden identisch sind, dass er mit der Aufnahme seiner Daten (Name und Anschrift)
              sowie der des Hundes in das EDV - System des Vereins und deren Veröffentlichung in öffentlich zugänglichen Publikationen einverstanden ist.
              Der Anmeldende versichert ebenfalls, dass für den oben gemeldeten Hund eine Haftpflichtversicherung besteht
            </p>
          </div>
          <legend>Gültigwerden der Anmeldung</legend>
          <div class="form-group row" :class="{'has-danger' : $v.check_ort.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="zeichnungort">Ort, Datum</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" name="check.ort" id="zeichnungort" placeholder="Ort, Datum"
                   v-model="check_ort"
                   @blur="$v.check_ort.$touch()">
          </div>
          <div class="form-group row" :class="{'has-danger' : $v.check_signatur.$invalid}">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="gezeichnet">Unterschrift, gez.</label>
            <input type="text" class="col-sm-12 col-md-8 form-control" name="check.signatur" id="gezeichnet" placeholder="Unterschrift, gez."
                   v-model="check_signatur"
                   @blur="$v.check_signatur.$touch()">
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label hidden-sm-down" for="gezeichnet">Nachricht</label>
            <textarea class="col-sm-12 col-md-8 form-control" rows=10 id="nachricht" name="check.nachricht" placeholder="Nachricht, Anmerkungen ..."></textarea>
          </div>
        </fieldset>

        <!-- Captcha -->
        <div class="row">
          <div id="captcha" class="g-recaptcha" :data-sitekey="rcapt_sig_key"></div>
        </div>

        <div class="row send-btn">
          <button :disabled="$v.$invalid" @click="schickeMail" type="button" class="col-sm-12 btn btn-outline-primary text-center">Absenden</button>
        </div>
      </form>

      <Modal v-if="showModalError" @close="showModalError = false">
        <h3 slot="header">Fehlermeldung</h3>
        <div slot="body">
          <div class="alert alert-danger" role="alert">
            <span v-if="errNr == 0">Aus Sicherheitsgründen ist dieses Formular mit einem <strong>Captcha</strong> versehen, welches Sie zuerst lösen müssen!</span>
            <span v-if="errNr == 1">Es werden nur PDF und JPG Dateien angenommen!</span>
            <span v-if="errNr == 2">Die Datei darf nicht > 2MB sein!</span>
            <span v-if="errNr == 3">Es ist ein Fehler beim Versand der Infos aufgetreten, bitte versuchen Sie es später nocheinmal.</span>
          </div>
        </div>
      </Modal>

      <Modal v-if="showModalSuccess" @close="showModalSuccess = false">
        <h3 slot="header">Online Meldung</h3>
        <div slot="body">
          <div class="alert alert-success" role="alert">
            Ihre Meldung wurde an den <strong>Obmann Prüfungswesen</strong> verschickt.
          </div>
        </div>
      </Modal>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Modal from './ModalInfo'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    components: {Modal},
    mounted () {
      if (window.grecaptcha) {
        const elCaptcha = window.document.getElementById('captcha')
        this.rcapt_id = window.grecaptcha.render(elCaptcha, {sitekey: this.rcapt_sig_key})
      }
    },
    data () {
      return {
        showModalError: false,
        errNr: 0,
        showModalSuccess: false,
        rcapt_sig_key: '6LezdUAUAAAAAKMU9K9ZMQmL3fkSGI3XRg4kTVDI',
        rcapt_id: 0,
        selectedPruefung: {},
        uploadPercentage: 0,
        pruefung_disziplin: '',
        pruefung_datum: '',
        pruefung_ort: '',
        hund_name: '',
        hund_rasse: '',
        hund_geschlecht: '',
        hund_wurfdatum: '',
        hund_zuchtbuch: '',
        hund_chip: '',
        hund_dgstb: '',
        hund_abl: '',
        hund_ll: '',
        hund_ente: '',
        hund_z_anschrift: '',
        vater_name: '',
        vater_zuchtbuch: '',
        vater_dgstb: '',
        vater_abl: '',
        vater_ll: '',
        mutter_name: '',
        mutter_zuchtbuch: '',
        mutter_dgstb: '',
        mutter_abl: '',
        mutter_ll: '',
        besitzer_name: '',
        besitzer_anschrift: '',
        fuehrer_name: '',
        fuehrer_anschrift: '',
        fuehrer_fon: '',
        fuehrer_email: '',
        fuehrer_jagdschein_nr: '',
        check_ort: '',
        check_signatur: '',
        check_nachricht: '',
        file_ente: '',
        file_pedegree: '',
        file_leistung: ''
      }
    },
    validations: {
      selectedPruefung: {required},
      pruefung_disziplin: {required},
      hund_name: {required},
      hund_rasse: {required},
      hund_geschlecht: {required},
      hund_wurfdatum: {required},
      hund_zuchtbuch: {required},
      hund_chip: {required},
      hund_z_anschrift: {required},
      hund_ente: {required},
      vater_name: {required},
      vater_zuchtbuch: {required},
      mutter_name: {required},
      mutter_zuchtbuch: {required},
      besitzer_name: {required},
      besitzer_anschrift: {required},
      fuehrer_name: {required},
      fuehrer_anschrift: {required},
      fuehrer_email: {required, email},
      fuehrer_fon: {required},
      check_ort: {required},
      check_signatur: {required}
    },
    watch: {
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
      changePruefung () {
        this.pruefung_disziplin = (this.selectedPruefung.pruefungen.length > 0) ? this.selectedPruefung.pruefungen[0] : ''
      },
      captchaSolved () {
        if (window.grecaptcha) {
          return window.grecaptcha.getResponse(this.rcapt_id).length > 0
        }
        return false
      },
      checkfile (event) {
        const rx = /(pdf$|jpe?g$)/g
        const files = event.srcElement.files
        console.log(files)
        if (files.length > 0) {
          const file = files[0]
          console.log(file)
          const b = rx.test(file.name)
          if (!b) {
            this.errNr = 1
            this.showModalError = true
            event.target.value = ''
          }
          if (file.size > 2 * 1024 * 1024) {
            this.errNr = 2
            this.showModalError = true
            event.target.value = ''
          }
        }
      },
      schickeMail () {
        if (this.captchaSolved()) {
          const elform = document.getElementById('meldungform')
          let data = new FormData(elform) // das ist unser Daten-Objekt ...

          const axiosconf = {
            method: 'post',
            url: 'upload.php',
            data: data,
            config: {headers: {'Content-Type': 'multipart/form-data'}},
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
            }.bind(this)
          }

          axios(axiosconf)
            .then(response => {
              this.showModalSuccess = true
            })
            .catch(response => {
              this.errNr = 3
              this.showModalError = true
              console.log(response)
            })
        } else {
          this.errNr = 0
          this.showModalError = true
        }
      }
    }
  }
</script>

<style scoped>
  .form-hint {
    color: darkred;
    padding-left: 0;
    font-style: italic;
  }

  #captcha {
    padding: 1rem 0;
  }
  .send-btn {
    padding-bottom: 1rem;
  }

  p {
    margin-bottom: 0.25rem;
  }

  #bank {
    margin: 1.5rem 0;
  }
</style>

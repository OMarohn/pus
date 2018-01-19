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
          <label class="col-sm-4 col-form-label hidden-sm-down" for="namebesitzer">Name, Vorname des Eigentümers</label>
          <input type="text" class="col-sm-12 col-md-8 form-control" id="namebesitzer" name="besitzer.name" placeholder="Name, Vorname des Eigentümers"
                 v-model="besitzer_name"
                 @blur="$v.besitzer_name.$touch()">
        </div>
        <div class="form-group row" :class="{'has-danger' : $v.besitzer_anschrift.$invalid}">
          <label class="col-sm-4 col-form-label hidden-sm-down" for="ortbesitzer">Adresse, PLZ, Wohnort des Eigentümers</label>
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
          <label class="col-sm-4 col-form-label hidden-sm-down" for="namefuehrer">Name, Vorname des Hundeführers</label>
          <input type="text" class="col-sm-12 col-md-8 form-control" id="namefuehrer" name="fuehrer.name" placeholder="Name, Vorname des Hundeführers"
                 v-model="fuehrer_name"
                 @blur="$v.fuehrer_name.$touch()">
        </div>
        <div class="form-group row" :class="{'has-danger' : $v.fuehrer_anschrift.$invalid}">
          <label class="col-sm-4 col-form-label hidden-sm-down" for="ortfuehrer">Adresse, PLZ, Wohnort des Hundeführers</label>
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
          <label class="col-sm-4 col-form-label hidden-sm-down" for="emailhundefuehrer">EMail des Hundeführers</label>
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
          <input type="file" class="col-sm-12 col-md-8 form-control-file" name="file.ente" id="fileente" aria-describedby="fileente_a">
          <small id="fileente_a" class="col-sm-12 col-md-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label hidden-sm-down" for="fileleistungsbuch">Leistungsbuch</label>
          <input type="file" class="col-sm-12 col-md-8 form-control-file" name="file.leistungsbuch" id="fileleistungsbuch" aria-describedby="fileleistungsbuch_a">
          <small id="fileleistungsbuch_a" class="col-sm-12 col-md-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label hidden-sm-down" for="filepedegree">Pedegree</label>
          <input type="file" class="col-sm-12 col-md-8 form-control-file" name="file.pedegree" id="filepedegree" aria-describedby="filepedegree_a">
          <small id="filepedegree_a" class="col-sm-12 col-md-8 form-text text-muted">Sie können nur PDF und JPG-Dateien, kleiner 2MB angeben</small>
        </div>
      </fieldset>

      <!-- Disclaimer -->
      <fieldset class="form-group">
        <div id="info">
          <p>Geprüft wird jeweils der zur Zeit gültigen Prüfungsordnung (PuS, FCI, JGHV).</p>
          <p>Teilnahme erfolgt ohne jede Haftung seitens des Veranstalters und der Revierinhaber.</p>
          <p><strong>Die Meldung erhält erst mit Zahlung des Nenngeldes ihre Gültigkeit.</strong></p>
          <h5>Meldegeldüberweisung an:</h5>
          <div>
            Verein für Pointer und Setter e.V. Landesgruppe Nord <br>
            Raiffeisenbank Ichenhausen <br>
            IBAN: DExxx xxxx xxxx xxx <br>
            Swift-Bic: XXXXXXX <br>
          </div>
          <br>
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

      <div class="row">
        <button :disabled="$v.$invalid" @click="schickeMail" type="button" class="col-sm-12 btn btn-outline-primary text-center">Absenden</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    mounted () {
      if (window.grecaptcha) {
        const elCaptcha = window.document.getElementById('captcha')
        this.rcapt_id = window.grecaptcha.render(elCaptcha, {sitekey: this.rcapt_sig_key})
      }
    },
    data () {
      return {
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
        check_nachricht: ''
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
      },
      captchaSolved () {
        if (window.grecaptcha) {
          return window.grecaptcha.getResponse(this.rcapt_id).length > 0
        }
        return false
      }
    },
    methods: {
      selectPruefung () {
        this.$store.commit('setAktivePruefung', this.selectedPruefung)
      },
      changePruefung () {
        this.pruefung_disziplin = (this.selectedPruefung.pruefungen.length > 0) ? this.selectedPruefung.pruefungen[0] : ''
      },
      schickeMail () {
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
  .form-hint {
    color: darkred;
    padding-left: 0;
    font-style: italic;
  }

  #captcha {
    padding: 1rem 0;
  }
</style>

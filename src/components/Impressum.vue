<template>
  <div class="impressum">
    <div class="row container-fluid">
      <div class="col-xl-10 offset-xl-1 col-sm-12">
        <div class="card">
          <div id="header" class="card-header">
            <h4>Impressum</h4>
          </div>

          <div class="card-body">
            <h2>Betreiber dieser Webseite</h2>
            <p>Verein für Pointer und Setter e.V.<br/>Landesgruppe Nord</p>
            <h3>Vertreten durch die Landesgruppenleiterin</h3>
            <p>Frau Elke Deichholz<br />Burgstraße 1<br />27412 Bülstedt<br />Tel: 04283-6998994<br />Email: <a href="mailto:landesgruppenleiter@pointer-setter-nord.de">Landesgruppenleiter@pointer-setter-nord.de</a></p>

            <h2>Haftungsausschluss</h2>
            <div class="block">
              <h3>Haftung für Inhalte</h3>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr Übernehmen.
                Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                Bei Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.</p>
            </div>
            <div class="block">
              <h3>Haftung für Links</h3>
              <p>Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe.
                Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.</p>
            </div>
            <div class="block">
              <h3>Urheberrecht</h3>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen Zustimmung.
                Soweit die Inhalte auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet.
                Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis.
                Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.</p>
            </div>
            <div class="block">
              <h3>Datenschutz</h3>
              <p>Die Nutzung meiner Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich.
                Soweit auf meinen Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
                Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                Ich weise darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
                Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen.
                Die Betreiberin der Seiten behält sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.</p>
              <p>Quellverweis: <a href="http://www.e-recht24.de/muster-disclaimer.htm" target="_blank">eRecht24 Disclaimer</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main',
    data () {
      return {
        msg: 'Willkommen'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-body {
    margin: 1rem;
  }

  .block {
    text-align: justify;
  }
</style>

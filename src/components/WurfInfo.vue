<template>
  <div class="card">
    <div class="card-header">
      <h4>{{wurfBuchstabe(wurf)}}
        <span v-if="wurfPotenz(wurf) !== ''"><sup>{{wurfPotenz(wurf)}}</sup></span> - Wurf : "{{wurf.kennel}}"
      </h4>
    </div>
    <div class="card-block">
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="sektion">Vater</span><hund-kurz :hund="wurf.vater"></hund-kurz>
            </li>
          </ul>
        </div>
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <span class="sektion">Mutter</span><hund-kurz :hund="wurf.mutter"></hund-kurz>
            </li>
          </ul>
      </div>
      <div class="col-12">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <span class="sektion">Züchter</span>
            <div class="zuechter">
              <span id="breeder">{{wurf.kontakt}}</span><span id="strasse"> - {{wurf.strasse}}</span><span id="ort"> - {{wurf.ort}}</span><span  v-if="wurf.fon" id="fon"> - {{wurf.fon}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <span class="sektion"></span>
            <div id="actionpanel">
              <transition appear appear-to-class="animated rubberBand">
                <div class="breeder-contact">
                  <a v-if="wurf.mail" :href="'mailto:' + wurf.mail" class="btn btn-sm btn-outline-success">
                    <i class="fa fa-envelope-o fa-fw"></i>
                  </a>
                  <a v-if="wurf.fon" :href="'tel:' + wurf.fon | phoneAsLink" class="btn btn-sm btn-outline-success">
                    <i class="fa fa-phone fa-fw"></i>
                  </a>
                  <a v-if="wurf.web" :href="'http://' + wurf.web" target="breeder" class="btn btn-sm btn-outline-success">
                    <i class="fa fa-external-link fa-fw"></i>
                  </a>
                </div>
              </transition>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer text-muted">
      <div class="wurfdatum">
        <div :class="{'overdue' : isOverdue(wurf) > 14}" v-if="wurf.eta">Erwartet: {{wurf.eta}}</div>
        <div v-if="wurf.gefallen">
          Gefallen: {{wurf.gefallen}}<span v-if="wurf.rueden"> - ({{wurf.rueden}},{{wurf.huendinnen}})</span>
          <span v-if="wurf.info && wurf.rueden"> - {{wurf.info}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HundKurz from './HundKurz.vue'

  export default {
    name: 'wurf-info',
    props: ['wurf'],
    methods: {
      wurfBuchstabe (wurf) {
        return wurf.wurf.charAt(0)
      },
      wurfPotenz (wurf) {
        return (wurf.wurf.length > 1) ? wurf.wurf.charAt(1) : ''
      },
      convDate (datum) { // doublette
        if (datum) {
          var parts = datum.split('.')
          if (parts.length === 3) {
            datum = parts[1] + '/' + parts[0] + '/' + parts[2]
          }
        }
        return datum
      },
      isOverdue (wurf) {
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const secondDate = new Date(this.convDate(wurf.etaDate))
        const firstDate = new Date()

        const diffDays = Math.round((firstDate.getTime() - secondDate.getTime()) / (oneDay))
        return diffDays
      }
    },
    components: {HundKurz}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-header h4 {
    width:100%;
    text-align: left;
  }

  #actionpanel {
    text-align: center;
    margin-left: 0.5rem;
  }

  .sektion {
    width: 6rem ;
    font-weight: bold;
  }

  #breeder {
    font-weight: bold;
    font-size: large;
    margin-left: 0.5rem;
  }

  .wurfdatum {
    text-align: right;
  }

  .overdue {
    color: darkred;
    font-weight: bold;
  }

  /**
  Hier kann noch einiges verbessert werden - P2 ;-)
   */
  @media (max-width: 568px) {
    h4 {
      font-size: 1rem;
    }

    .wurfdatum {
      font-size: 0.75rem;
    }
  }

</style>

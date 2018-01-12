import Vue from 'vue'
import Router from 'vue-router'
import Rueden from '@/components/Rueden'
import Zuechter from '@/components/Zuechter'
import Wuerfe from '@/components/Wurf'
import Vorstand from '@/components/Vorstand'
import AktivAktuell from '@/components/AktivAktuell'
import AktivTermin from '@/components/AktivTermin'
import ErgebnisListe from '@/components/ErgebnisListe'
import Impressum from '@/components/Impressum'
import Links from '@/components/Links'
import OnlineMeldung from '@/components/forms/Meldeformular'
import Main from '@/components/MainSlide'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ZuHause',
      component: Main
    },
    {
      path: '/verein/vorstand',
      name: 'Vorstand',
      component: Vorstand
    },
    {
      path: '/wurf/:rasse',
      name: 'Wurf',
      component: Wuerfe
    },
    {
      path: '/rueden/:rasse',
      name: 'Rueden',
      component: Rueden
    },
    {
      path: '/zuechter/:rasse',
      name: 'Zuechter',
      component: Zuechter
    },
    {
      path: '/aktiv/aktuell',
      name: 'aktivAktuell',
      component: AktivAktuell
    },
    {
      path: '/aktiv/termine',
      name: 'aktivTermin',
      component: AktivTermin
    },
    {
      path: '/ergebnis',
      name: 'ergebnis',
      component: ErgebnisListe
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: Impressum
    },
    {
      path: '/links',
      name: 'links',
      component: Links
    },
    {
      path: '/meldung',
      name: 'meldung',
      component: OnlineMeldung
    }
  ]
})

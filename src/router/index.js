import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Rueden from '@/components/Rueden'
import Zuechter from '@/components/Zuechter'
import Welpen from '@/components/Welpen'
import Vorstand from '@/components/Vorstand'
import AktivAktuell from '@/components/AktivAktuell'
import AktivTermin from '@/components/AktivTermin'

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
      path: '/welpen/:rasse',
      name: 'Welpen',
      component: Welpen
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
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Rueden from '@/components/Rueden'
import Zuechter from '@/components/Zuechter'
import Welpen from '@/components/Welpen'
import Vorstand from '@/components/Vorstand'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
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
    }
  ]
})

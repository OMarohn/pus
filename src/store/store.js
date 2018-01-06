import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

const rassen = ['englisch', 'pointer', 'gordon', 'irish', 'redandwhite']

const state = {
  wuerfe: {
    englisch: [],
    pointer: [],
    gordon: [],
    redandwhite: [],
    irish: []
  },
  kennel: {
    englisch: [],
    pointer: [],
    gordon: [],
    redandwhite: [],
    irish: []
  },
  studdogs: {
    englisch: [],
    pointer: [],
    gordon: [],
    redandwhite: [],
    irish: []
  }
}

const mutations = {
  aktualisiereRueden (state, payload) {
    console.log(payload.name, payload.daten)
    state.studdogs[payload.name] = payload.daten
  },
  aktualisiereWuerfe (state, payload) {
    console.log(payload.name, payload.daten)
    state.wuerfe[payload.name] = payload.daten
  },
  aktualisiereKennel (state, payload) {
    console.log(payload.name, payload.daten)
    state.kennel[payload.name] = payload.daten
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  loadRueden: ({commit}) => {
    _.forEach(rassen, (rasse) => {
      axios.get('static/data/rueden/' + rasse + '.json')
        .then(response => {
          const payload = {name: rasse, daten: response.data}
          commit('aktualisiereRueden', payload)
        })
        .catch(e => {
          console.error(e)
        })
    })
  },
  loadWelpen: ({commit}) => {
    _.forEach(rassen, (rasse) => {
      axios.get('static/data/welpen/' + rasse + '.json')
        .then(response => {
          const w = response.data
          const p = _.partition(w, (wurf) => {
            return wurf.hasOwnProperty('gefallen')
          })
          const payload = {name: rasse, daten: p}
          commit('aktualisiereWuerfe', payload)
        })
        .catch(e => {
          console.error(e)
        })
    })
  },
  loadKennel: ({commit}) => {
    _.forEach(rassen, (rasse) => {
      axios.get('static/data/kennel/' + rasse + '.json')
        .then(response => {
          const payload = {name: rasse, daten: response.data}
          commit('aktualisiereKennel', payload)
        })
        .catch(e => {
          console.error(e)
        })
    })
  }
}

// getters are functions
const getters = {
  getRueden: (state) => {
    return state.studdogs
  },
  getWuerfe: (state) => {
    return state.wuerfe
  },
  getKennel: (state) => {
    return state.kennel
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store

store.dispatch('loadRueden')
store.dispatch('loadWelpen')
store.dispatch('loadKennel')

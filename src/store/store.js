import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

function convDate (datum) {
  if (datum) {
    var parts = datum.split('.')
    if (parts.length === 3) {
      datum = parts[1] + '/' + parts[0] + '/' + parts[2]
    }
  }
  return datum
}

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
  },
  termine: [],
  aktiverPruefung: {}
}

const mutations = {
  aktualisiereRueden (state, payload) {
    state.studdogs[payload.name] = payload.daten
  },
  aktualisiereWuerfe (state, payload) {
    state.wuerfe[payload.name] = payload.daten
  },
  aktualisiereKennel (state, payload) {
    state.kennel[payload.name] = payload.daten
  },
  aktualisiereTermine (state, payload) {
    state.termine = payload
  },
  setAktivePruefung (state, payload) {
    state.aktivePruefung = payload
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
  },
  loadTermine: ({commit}) => {
    axios.get('static/data/aktuell/newsdate.json')
      .then(response => {
        const payload = response.data[0].termine.sort((a, b) => {
          return new Date(convDate(a.datum)) - new Date(convDate(b.datum))
        })
        commit('aktualisiereTermine', payload)
      })
      .catch(e => {
        console.error(e)
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
  },
  getAktivePTermine: (state) => {
    return _.filter(state.termine, (termin) => {
      return ((termin.typ === 'Pruefung') && (new Date(convDate(termin.meldeschluss)) >= new Date()))
    })
  },
  getAktivePruefung: (state) => {
    return state.aktivePruefung
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store

store.dispatch('loadWelpen')
store.dispatch('loadRueden')
store.dispatch('loadKennel')
store.dispatch('loadTermine')

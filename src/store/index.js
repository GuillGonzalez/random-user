import { createStore } from 'vuex'

const state = {
  genderSelection: 'female',
  nationality: '',
  age: [18, 99]
}

const mutations = {

  setGender (state, n) {
    state.genderSelection = n
  },
  setNationality (state, n) {
    state.nationality = n
  },
  setAge (state, n) {
    state.age = n
  },
  setfilterMode (stage, n) {
    stage.filterMode = n
  }
}

export default createStore({
  state,
  mutations
})
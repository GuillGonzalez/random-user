import { createStore } from 'vuex'

const state = {
  genderSelection: 'female',
  nationality: '',
  age: [18, 99],
  profileSelected: {}
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
    state.filterMode = n
  },
  setProfileSelected (stage, n) {
    state.profileSelected = n
  }
}

export default createStore({
  state,
  mutations
})
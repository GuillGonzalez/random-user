<template>
  <div>
    <vm-button>It works</vm-button>
    <h2>Profiles List</h2>
    <h2> {{ ageSelection }} </h2>
    <h2> {{ natSelection }} </h2>
    <h2> {{ genderSelection }} </h2>
    <h3>Activate filter {{ useFilter }}</h3>
    <vue-toggle v-model="useFilter" />

    <vue-select 
      v-model="genderSelectedOptions"
      :value="$store.genderSelection"
      @input="updateGender"
      @selected="updateGender"
      :options="['female', 'male']"
      close-on-select
    ></vue-select>
    
    <vue-slider 
      v-model="ageValue"
      @change="updateAge(ageValue)"
    ></vue-slider>
    
    <select-nat
      v-bind:data="listData"
      @natSelected = "updateNationality"
    ></select-nat>
    <ul>
      <li
        v-for="(profile, key) in listData"
        v-bind:key="key">
        <profile-item
          v-bind:data="profile"
          v-bind:useFilter="useFilter"
        ></profile-item>
      </li>
    </ul>
  </div>
</template>

<script>
import Config from '../config'
import ProfileItem from './ProfileItem.vue'
import SelectField from './SelectField.vue'
import SelectNat from './SelectNat.vue'
import VueSelect from 'vue-next-select'
import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Slider from '@vueform/slider'
import Toggle from '@vueform/toggle'
import VmButton from 'vue3-material'

export default {
  setup () {
    const store = useStore();
    const baseURL = Config.url
    const listData = ref([])
    const axiosError = ref('')
    const genderSelectedOptions = ref('')

    axios.get(baseURL+'/?results=35')
      .then( function( response ){
        listData.value = response.data.results;
        sortCountries(listData.value)
      }.bind(this))
      .catch( function( error ){
        axiosError.value = error;
    }.bind(this));

    function sortCountries (list) { 
      list.forEach((e)=>{
        if(!uniqueCountries.includes(e.nat)){
          uniqueCountries.push(e.nat)
        }
      })
     }

    store.commit('setGender', 'male')

    return {
      ageSelection:    computed(() => store.state.age),
      genderSelection: computed(() => store.state.genderSelection),
      natSelection:    computed(() => store.state.nationality),
      axiosError,
      listData,
      genderSelectedOptions,
    }
  },
  components: {
    'profile-item': ProfileItem,
    'select-field': SelectField,
    'select-nat': SelectNat,
    'vue-select': VueSelect,
    'vue-slider': Slider,
    'vue-toggle': Toggle
  },
  data () {
    return {
      useFilter: false,
      ageValue: [18, 90]
    }
  },
  methods: {
    updateNationality (event) {
      this.$store.commit('setNationality', event)
    },
    updateAge (value) {
      this.$store.commit('setAge', value)
    },
    updateGender (value) {
      this.$store.commit('setGender', value)
    }
  }
}

</script>

<style src="@vueform/slider/themes/default.css"></style>
<style src="vue-next-select/dist/index.min.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>
  .vue-select {
    margin: 3rem
  }
</style>
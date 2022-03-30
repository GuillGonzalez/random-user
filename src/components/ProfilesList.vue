<template>
    <v-app-bar>
      <h2>Profiles List</h2>
    </v-app-bar>

    <v-navigation-drawer>
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

        <v-select
          :items="['female','male']"
          label="Gender"
          v-on:change="updateGender()"
          v-model="genderSelectedOptions"
          :value="$store.genderSelection"
          dense
        ></v-select>

        <vue-slider 
          v-model="ageValue"
          @change="updateAge(ageValue)"
        ></vue-slider>

        <select-nat class="ma-3"
          v-bind:data="uniqueCountries"
          @natSelected = "updateNationality"
        ></select-nat>

        <v-select
            :items="uniqueCountries"
            label="Standard"
            dense
          ></v-select>

    </v-navigation-drawer>

  <v-main>
    <v-container>
      <v-layout column>
        <v-flex>
          <v-list
            v-for="(profile, key) in listData"
            v-bind:key="key">
            <profile-item
              v-bind:data="profile"
              v-bind:useFilter="useFilter"
            ></profile-item>
          </v-list>

        </v-flex>
        <v-flex>
          <h2>Selected Profile</h2>
        </v-flex>
      </v-layout>
    </v-container>    
  </v-main>
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

export default {
  setup () {
    const store = useStore();
    const baseURL = Config.url
    const listData = ref([])
    const axiosError = ref('')
    const genderSelectedOptions = ref('')
    const uniqueCountries = ref([])

    axios.get(baseURL+'/?results=20')
      .then( function( response ){
        listData.value = response.data.results;
        uniqueCountries = sortCountries(listData.value)
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
      return uniqueCountries.value
      console.log(uniqueCountries)
     }

    store.commit('setGender', 'male')

    return {
      ageSelection:    computed(() => store.state.age),
      genderSelection: computed(() => store.state.genderSelection),
      natSelection:    computed(() => store.state.nationality),
      axiosError,
      listData,
      genderSelectedOptions,
      uniqueCountries
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
      console.log('update gender')
      this.$store.commit('setGender', value)
    }
  }
}

</script>

<style src="@vueform/slider/themes/default.css"></style>
<style src="vue-next-select/dist/index.min.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>
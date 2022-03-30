<template>
  <v-container>
    <v-layout column>
      <v-card v-show="isFiltered || !useFilter" hover="true" @click="selectProfile()">
        <v-flex md1 d-flex color="primary">
          <v-btn icon  @click="variable = !variable" variant="plain" color="pink">
            <v-icon >mdi-heart</v-icon>
          </v-btn>
        </v-flex>
        <v-flex md1 d-flex color="primary">
          <h2> {{ profileData.name.first }} </h2>
          <p>Email: {{ profileData.email }}</p>
          <p>Birthdate: {{ profileData.dob.date }}</p>
          <p>Edad: {{ ageSelection }} / {{profileData.dob.age }}</p>
          <p>Register date: {{profileData.registered.date }}</p>
          <p>Nacionalidad: {{ natSelection }} / {{profileData.nat }}</p>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  export default {
    props: [
      'data',
      'useFilter'
    ],
    setup (props) {
      const store = useStore();
      return {
        ageSelection:    computed(() => store.state.age),
        genderSelection: computed(() => store.state.genderSelection),
        natSelection:    computed(() => store.state.nationality),
        isFiltered:      computed(() => {
        //   console.log('--------------------------------------------------')
        //   console.log ('props nationality:' + props.data.nat);
        //   console.log ('props gender:' + props.data.gender);
        //   console.log ('Nationality:' + props.data.nat);
        //   console.log ('GENDER:' + (store.state.genderSelection === props.data.gender));
        //   console.log ('Nationality' + (store.state.nationality    === props.data.nat));
        //   console.log ('AGE1'+(store.state.age[0] <= props.data.dob.age));
        //   console.log ('AGE2'+(store.state.age[1] >= props.data.dob.age));
          store.state.genderSelection === props.data.gender &&
          store.state.nationality    === props.data.nat &&
          store.state.age[0] <= props.data.dob.age &&
          store.state.age[1] >= props.data.dob.age
          }
        )  
      }
    },
    data (props) {
      const profileData = props.data
      return {
        profileData
      }
    },
    mathods: {
      selectProfile () { console.log('select')}
    }
  }
</script>

<style scoped>


</style>
<template>
  <div v-show="isFiltered || !useFilter">
    <p>Use Filter {{ useFilter }}</p>
    <p>Seleccion:</p>
    <p>Genero: {{ genderSelection }} / {{profileData.gender }}</p>
    <p>Edad: {{ ageSelection }} / {{profileData.dob.age }}</p>
    <p>Nacionalidad: {{ natSelection }} / {{profileData.nat }}</p>
    <div>
      <h2> {{ profileData.name.first }} </h2>
    </div>
    <hr/>
  </div>
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
          console.log('--------------------------------------------------')
          console.log ('props nationality:' + props.data.nat);
          console.log ('props gender:' + props.data.gender);
          console.log ('Nationality:' + props.data.nat);
          console.log ('GENDER:' + (store.state.genderSelection === props.data.gender));
          console.log ('Nationality' + (store.state.nationality    === props.data.nat));
          console.log ('AGE1'+(store.state.age[0] <= props.data.dob.age));
          console.log ('AGE2'+(store.state.age[1] >= props.data.dob.age));
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
  }
</script>

<style scoped>


</style>
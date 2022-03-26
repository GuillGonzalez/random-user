<template>
<div>
  <p>Selected: {{ selected }}</p>
  <select 
    name="gender"
    v-model="selected">
    <option
      v-for="(field, key) in filter"
      v-bind:key="key"
    >{{ field }}</option>
  </select>
  </div>
</template>

<script>
import { reactive } from 'vue'
  
  export default {
    setup () {
      const gender = []
      const state = reactive({selected: 'female'})
      return {
        state
      }
    },
    props: ['filter']
  }
</script>
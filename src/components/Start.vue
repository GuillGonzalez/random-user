<template>
<div>
  <profiles-list></profiles-list>
</div>
</template>

<script>
import Config from '../config'
import { ref } from 'vue'
import ProfilesList from '../components/ProfilesList.vue'

export default {
  name: 'StartView',
  setup () {
    const webservice = ref(Config.url)
    return {
      webservice
    }
  },
  components: {
    'profiles-list': ProfilesList
  }
}
</script>

<script setup>
import { defineComponent } from 'vue';
import ProfileItem from '../components/ProfileItem.vue';
import { LayoutGrid } from 'vue3-material';

</script>

<template>
  <main>
    <LayoutGrid>
      <ProfileItem />
    </LayoutGrid>
  </main>
</template>

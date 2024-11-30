<template>
  <template v-if="icon.startsWith('<svg')">
    <div v-html="icon" class="inline-block w-3 h-3"></div>
  </template>
  <template v-else>
    <img :src="IconPath(icon)" class="w-5" />
  </template>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  methods: {
    IconPath(icon) {
      //  return "../assets/icons/football.png";
      return new URL(`../assets/icons/${icon}.png`, import.meta.url).href;
    },
  },
};
</script>

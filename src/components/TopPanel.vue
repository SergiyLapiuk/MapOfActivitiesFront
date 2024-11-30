<template>
  <div
    class="bg-blue-100 bg-opacity-80 top-0 left-0 w-full px-4 py-2 flex flex-row gap-2 border-gray-400 border-b justify-center items-center"
  >
    <div class="relative flex-1 max-w-md">
      <input
        v-model="text"
        class="bg-transparent p-4 pr-8 border border-gray-800 w-full h-10 focus:border-black rounded-2xl"
      />
      <div class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
        <q-icon v-if="text === ''" name="search" size="sm" />
        <q-icon v-else name="clear" @click="text = ''" />
      </div>
    </div>

    <FilterIcon @click="showFilters" />
  </div>
</template>
<script>
import SearchIcon from "../components/icons/SearchIcon.vue";
import FilterIcon from "../components/icons/FilterIcon.vue";
export default {
  components: {
    FilterIcon,
  },
  props: {
    searchText: { type: String, default: "" },
  },
  data: function () {
    return {
      text: this.searchText,
    };
  },
  watch: {
    text() {
      this.updateText();
    },
  },
  methods: {
    showFilters() {
      this.$emit("showFilters");
    },
    updateText() {
      this.$emit("updateText", this.text);
    },
  },
};
</script>
<style scoped></style>

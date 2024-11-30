<template>
  <div>
    <TypeFilterOption v-if="all" :type="all" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TypeFilterOption from "./TypeFilterOption.vue";
export default {
  components: { TypeFilterOption },
  name: "TypesSelector",
  props: {
    value: { type: Number, default: undefined },
    tabindex: {
      type: Number,
      default: 0,
    },
    many: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      types: "getEventTypesTree",
      typesStatus: "getEventTypesStatus",
      leafTypes: "getLeafTypes",
      selectedLeafTypes: "getSelectedLeafTypes",
    }),
    all() {
      return {
        name: "Всі типи",
        children: this.types ?? [],
        id: 0,
      };
    },
    type() {
      return this.leafTypes.find((x) => x.id == this.value);
    },
  },
  data() {
    return {
      showKids: false,
    };
  },
  async mounted() {
    await this.getTypes();
    console.log(this.types)
  },

  methods: {
    async getTypes() {
      await Promise.all([
        this.types.length < 1
          ? this.$store.dispatch("GET_EVENT_TYPES_TREE")
          : undefined,
      ]);
    },
    // input(id) {
    //   this.showKids = false;
    //   this.$emit("input", id);
    // },
    getLabel() {
      if (this.typesStatus == "loading") {
        return "Завантаження...";
      } else if (this.typesStatus == "error") {
        return "Не вдалось завантажити типи";
      }
      return this.type == null ? "Select type" : this.type.name;
    },
  },
};
</script>
<style></style>

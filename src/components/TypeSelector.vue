<template>
  <div
    @focusin="showKids = !showKids"
    @focusout="showKids = false"
    tabindex="0"
  >
    <div>
      <q-input
        :tabindex="tabindex"
        class="!pb-0"
        square
        outlined
        :label="getLabel()"
        readonly
        :rules="[(val) => !!val || 'Необхідно заповнити']"
      ></q-input>
    </div>
    <div v-show="showKids" class="relative w-full">
      <div
        class="absolute w-full top-0 left-0 w-100 border border-gray-400 bg-white z-50"
      >
        <div v-for="(e, index) in types" :key="index">
          <TypeOption
            :type="e"
            @input="(id) => input(id)"
            :parentShowKids="this.showKids"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import TypeOption from "./TypeOption.vue";
export default {
  components: { TypeOption },
  name: "TypeSelector",
  props: {
    value: { type: Number, default: undefined },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({
      types: "getEventTypesTree",
      typesStatus: "getEventTypesStatus",
      leafTypes: "getLeafTypes",
    }),
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
  },

  methods: {
    async getTypes() {
      await Promise.all([
        this.types.length < 1
          ? this.$store.dispatch("GET_EVENT_TYPES_TREE")
          : undefined,
      ]);
    },
    input(id) {
      this.showKids = false;
      this.$emit("input", id);
    },
    getLabel() {
      if (this.typesStatus == "loading") {
        return "Завантаження...";
      } else if (this.typesStatus == "error") {
        return "Не вдалось завантажити типи";
      }
      if(this.value >0 && this.type === undefined){return "Інше"}
      return this.type == null ? "Вибір типу" : this.type.name;
    },
  },
};
</script>
<style>
.typeOption {
  @apply pl-2 p-2 text-sm;
}
</style>

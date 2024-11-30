<template>
  <div>
    <div
      class="p-1 addPadding flex flex-row justify-start items-center"
      @click.stop="handleClick"
    >
      {{ localType.name }}
      <span v-if="localType.children?.length != 0">
        <q-icon name="expand_more" />
      </span>

      <q-checkbox
        dense
        class="m-0 ml-auto"
        size="xs"
        :model-value="isSelected"
        @update:model-value="(val) => setSelected(val)"
      />
    </div>

    <div v-show="showKids" v-for="(t, index) in localType.children" :key="index">
      <TypeOption :type="t" :toroot="toroot + 1" />
      <TypeOption v-if="index == localType.children.length - 1"
      :type="{id:localType.id,name:'Інше',children: []}"
      :toroot="toroot + 1"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TypeOption",
  props: {
    type: { type: Object, default: undefined },
    toroot: { type: Number, default: 1 },
    parentShowKids: { type: Boolean, default: false },
    many: { type: Boolean, default: false },
  },
  computed: {
    isSelected() {
      return this.$store.getters.isTypeSelected(this.localType.id);
    },
    leftPadding() {
      return (this.toroot - 1) * 8 + "px";
    },
  },
  data() {
    return {
      showKids: false,
      select: false,
      localType: null,
    };
  },
  mounted() {
    this.localType = this.type;
 //   console.log(this.localType.children)
  },
  methods: {
    // input(id) {
    //   this.$emit("input", id);
    // },
    handleClick() {
    if (this.localType.children?.length === 0) {
      console.log(this.localType);
      //this.input(this.localType.id);
    } else {
      console.log(this.localType)
        this.showKids = !this.showKids;
    }
  },
    setSelected(val) {
      if (val == true) {
        this.$store.dispatch("SELECT_TYPE", {
          type: this.localType,
        });
      } else {
        this.$store.dispatch("DESELECT_TYPE", {
          type: this.localType,
        });
      }
    },
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        this.localType = newVal;
 //       console.log(newVal.children);
      }
    },
    parentShowKids(val) {
      if (val == false) {
        this.showKids = false;
      }
    },
  },
};
</script>
<style scoped>
.addPadding {
  padding-left: v-bind("leftPadding");
}
</style>

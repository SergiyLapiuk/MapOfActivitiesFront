<template>
  <div>
    <div
      class="typeOption hover:bg-slate-100 addPadding"
      @click.stop="handleClick"
    >
      {{ localType.name }}
      <div class="h-3 w-3 ml-2 inline-block" v-if="localType.imageURL">
        <EventIcon :icon="localType.imageURL" />
      </div>
      <span v-if="localType.children?.length !== 0">
        <q-icon name="expand_more" />
      </span>
    </div>

    <div
      v-show="showKids"
      v-for="(t, index) in localType.children"
      :key="index"
    >
      <TypeOption
        :type="t"
        :toroot="toroot + 1"
        @input="(id) => input(id)"
        :parentShowKids="showKids"
      />
      <TypeOption
        v-if="index == localType.children.length - 1"
        :type="{ id: localType.id, name: 'Інше', children: [] }"
        :toroot="toroot + 1"
        @input="(id) => input(localType.id)"
        :parentShowKids="showKids"
      />
    </div>
  </div>
</template>
<script>
import EventIcon from "./EventIcon.vue";
export default {
  components: { EventIcon },
  name: "TypeOption",
  props: {
    type: { type: Object, default: undefined },
    toroot: { type: Number, default: 1 },
    parentShowKids: { type: Boolean, default: false },
  },
  computed: {
    leftPadding() {
      return this.toroot * 8 + "px";
    },
  },
  data() {
    return {
      showKids: false,
      localType: this.type,
    };
  },
  methods: {
    input(id) {
      this.$emit("input", id);
    },

    handleClick() {
      if (this.localType.children?.length === 0) {
        console.log(this.localType);
        this.input(this.localType.id);
      } else {
        console.log(this.localType);
        this.showKids = !this.showKids;
      }
    },
  },
  watch: {
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

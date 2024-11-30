<template>
  <div class="flex flex-col gap-1 w-full">
    <div class="flex items-center text-base">
      <h5>Фільтри</h5>
      <q-icon
        @click="$emit('close')"
        name="close"
        class="ml-auto cursor-pointer"
        size="sm"
      />
    </div>
    <DateTimeInput
      :dense="true"
      class="flex-none w-full"
      label="Час початку"
      :value="filters.startTime ?? null"
      :min="new Date().toISOString()"
      @input="(v) => (filters.startTime = v)"
    />
    <DateTimeInput
      :dense="true"
      class="flex-none w-full"
      label="Час закінчення"
      :value="filters.endTime ?? null"
      :min="filters.startTime ?? null"
      @input="(v) => (filters.endTime = v)"
    />
    <types-selector class="flex-none" />
    <!--
      <div class="pr-1 flex flex-row justify-start items-center">
      Show types with no time
      <q-checkbox
        dense
        class="m-0 ml-auto"
        size="xs"
        :model-value="isSelected"
        @update:model-value="(val) => setSelected(val)"
      />
    </div>
      -->
    <q-input
      dense
      class="flex-none"
      label="Відстань в метрах"
      type="number"
      v-model="filters.distance"
      clearable
    />
    <q-input
      class="flex-none"
      dense
      bottom-slots
      v-model="filters.userPoint"
      label="Локація"
      readonly
    >
      <template v-slot:prepend>
        <q-icon name="place" @click="setLocation()" />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click="filters.userPoint = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>

    <div id="map1" class="w-full flex-1"></div>
    <q-btn class="w-full flex-none" @click="updateFilters">Оновити</q-btn>
  </div>
</template>

<script>
import DateTimeInput from "src/components/DateTimeInput.vue";
import TypesSelector from "src/components/TypesFilter.vue";
import { mapGetters } from "vuex";
import L, { latLng } from "leaflet";
import { setCurrentTime } from "src/convertDate";

export default {
  components: {
    DateTimeInput,
    TypesSelector,
  },
  data() {
    return {
      filters: {
        startTime: null,
        endTime: null,
        distance: null,
        userPoint: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      types: "getSelectedTypes",
    }),
    startTime() {
      return this.filters.startTime;
    },
    endTime() {
      return this.filters.endTime;
    },
  },
  async mounted() {
    await this.getFilters();
    this.circle = null;
    this.showMap();
    //console.log(localStorage.getItem("typesFilters"));
    if (this.filters.startTime == null)
      this.filters.startTime = new Date().toISOString();
    // console.log(this.filters);
    this.showCircle(this.toLatLng(this.filters.userPoint));
  },
  watch: {
    startTime: {
      handler(val, last) {
        if (last == null) {
          let withCurrentTime = setCurrentTime(last);
          this.filters.startTime = withCurrentTime;
        }
        if (this.filters.endTime != null && val > this.filters.endTime) {
          this.filters.endTime = val;
        }
      },
    },
    endTime(val, last) {
      if (last == null) {
        let withCurrentTime = setCurrentTime(last);
        this.filters.endTime = withCurrentTime;
      }
      if (val != null && val != "" && val <= this.filters.startTime) {
        this.filters.endTime = this.filters.startTime;
      }
    },
    "filters.distance": function (newDistance) {
      if (this.circle) {
        this.circle.setRadius(newDistance);
      }
    },
  },
  methods: {
    async updateFilters() {
      console.log(
        this.filters,
        this.types,
        this.$store.getters.getSelectedTypes
      );
      this.$store.dispatch("SAVE_TYPE_FILTERS");
      localStorage.setItem("filters", JSON.stringify(this.filters));

      let types_ = Object.keys(this.types);
      types_ = types_.filter((x) => this.types[x] == true);

      this.$emit("update", { ...this.filters, types: types_ });
    },
    getFilters() {
      this.$store.dispatch("GET_TYPE_FILTERS");
      if (localStorage.getItem("filters")) {
        this.filters = JSON.parse(localStorage.getItem("filters"));
      }
      if (this.filters.distance == null) {
        this.filters.distance = 3000;
      }
      if (this.filters.userPoint == null) {
        this.filters.userPoint = "50.451937587, 30.519332886";
      }
    },
    setLocation() {},
    showMap() {
      this.map = L.map("map1").setView([50.44, 30.56], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.map);
      this.marker = null;
      this.map.on("click", (event) => {
        const latlng = event.latlng;
        this.showCircle(latlng);
      });
    },

    showCircle(latlng) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      if (this.circle) {
        this.map.removeLayer(this.circle);
      }

      this.marker = L.marker(latlng).addTo(this.map);
      this.filters.userPoint = `${latlng.lat.toFixed(9)}, ${latlng.lng.toFixed(
        9
      )}`;
      this.circle = L.circle(this.marker.getLatLng(), {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.2,
        radius: this.filters.distance,
      }).addTo(this.map);

      this.map.fitBounds(this.circle.getBounds());
    },

    toLatLng(string) {
      console.log(string);
      let floats = string.split(", ").map(parseFloat);
      let res = {};
      res.lat = floats[0];
      res.lng = floats[1];
      return res;
    },
  },
};
</script>

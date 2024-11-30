<template>
  <top-panel
    class="sticky top-0 left-0 z-10"
    @showFilters="showFilters = !showFilters"
    :searchText="searchName"
    @updateText="(text) => search(text)"
  >
  </top-panel>

  <div>
    <div class="">
      <div v-if="eventsStatus == 'loading'" class="status">
        <q-spinner color="primary" size="3em" class="mx-auto" />
      </div>
      <div v-else-if="eventsStatus == 'error'" class="status">
        Щось пішло не так - певно, проблеми зі з'єднанням.
      </div>

      <div
        v-else
        v-for="(event, index) in events"
        :key="index"
        class="event-item relative"
      >
        <router-link class="" :to="'/event-page?id=' + event.id">{{
          event.name
        }}</router-link>
        <div class="flex mt-3">
          <div class="text-gray-500 ml-auto h-fit">
            <EventIcon class="inline-block w-5" :icon="event.type?.typeIcon" />
            <div class="inline-block"></div>
            {{ event.type.typeName }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-drawer v-model="showFilters" side="left" class="w-fit">
    <EventFilters
      class="p-3 h-full"
      @close="showFilters = false"
      @update="(f) => update(f)"
    />
  </q-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import EventFilters from "src/components/FiltersPanel.vue";
import TopPanel from "src/components/TopPanel.vue";
import EventIcon from "src/components/EventIcon.vue";
export default {
  components: {
    EventFilters,
    TopPanel,
    EventIcon,
  },
  data() {
    return {
      isSearchActive: false,
      showFilters: false,
      searchName: "",
    };
  },
  computed: {
    ...mapGetters({
      events: "getEvents",
      eventsStatus: "getEventsStatus",
    }),
    searchInputClasses() {
      return {
        "hidden md:!block lg:!block": !this.isSearchActive, // Коли пошук не активний, використовуйте 'hidden'
        "md:block": this.isSearchActive, // Коли пошук активний, показати на середніх екранах
        "lg:block": this.isSearchActive, // Коли пошук активний, показати на великих екранах
        "sm:block": this.isSearchActive,
        "search-input": true, // Завжди використовуйте цей клас для стилів
      };
    },
  },
  async mounted() {
    await this.getEvents();
  },

  methods: {
    toggleSearch() {
      this.isSearchActive = !this.isSearchActive;
      if (this.isSearchActive) {
        this.$nextTick(() => {
          this.$el.querySelector(".search-input").focus();
        });
      }
    },
    async getEvents() {
      await Promise.all([
        this.events.length < 1 ? this.$store.dispatch("GET_EVENTS") : undefined,
      ]);
    },
    async update(filters) {
      await Promise.all([
        this.$store.dispatch("GET_EVENTS", {
          filters: {
            ...filters,
          },
          searchName: this.searchName,
        }),
      ]);
      this.showFilters = false;
    },
    async search(text) {
      this.searchName = text;
      await Promise.all([
        this.$store.dispatch("GET_EVENTS", {
          searchName: this.searchName,
        }),
      ]);
    },
  },
};
</script>

<style>
.event-item {
  border: 1px solid #ccc;
  padding: 16px 16px 8px 16px;
  max-width: 80%;
  margin: 12px auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  background-color: #ffffff;
}

.event-item:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.event-item a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.event-item a:hover {
  color: #007bff;
}
</style>

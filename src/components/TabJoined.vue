<template>
  <div>
    <div>
      <div class="">
        <div v-if="userEventsStatus == 'loading'" class="status">
          <q-spinner color="primary" size="3em" class="mx-auto" />
        </div>
        <div v-else-if="userEventsStatus == 'error'" class="status">
          Щось пішло не так - певно, проблеми зі з'єднанням.
        </div>
        <div
          v-else
          v-for="(event, index) in userEvents"
          :key="index"
          class="event-item-joined relative"
        >
          <router-link :to="'/event-page?id=' + event.id">{{
            event.name
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    id: {
      type: [Number],
      default: null,
    },
  },

  data() {
    return {
      userId: this.id,
    };
  },

  mounted() {
    this.getUserEvents();
  },

  computed: {
    ...mapGetters({
      userEvents: "getUserEvents",
      userEventsStatus: "getUserEventsStatus",
    }),
  },

  methods: {
    async getUserEvents() {
      if (this.userId == null) {
        return;
      }
      await Promise.all([
        this.profile != {}
          ? this.$store.dispatch("GET_USER_EVENTS", { id: this.userId })
          : undefined,
      ]);
    },
  },

  watch: {
    id(val) {
      this.userId = val;
      this.getUserEvents();
    },
  },
};
</script>

<style>
.event-item-joined {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 80%;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  background-color: #ffffff;
}

.event-item-joined:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.event-item-joined a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.event-item-joined a:hover {
  color: #007bff;
}
</style>

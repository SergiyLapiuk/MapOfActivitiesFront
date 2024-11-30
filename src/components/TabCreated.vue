<template>
  <div>
    <div>
      <div class="">
        <div v-if="authorEventsStatus == 'loading'" class="status">
          <q-spinner color="primary" size="3em" class="mx-auto" />
        </div>
        <div v-else-if="authorEventsStatus == 'error'" class="status">
          Щось пішло не так - певно, проблеми зі з'єднанням.
        </div>
        <div
          v-else
          v-for="(event, index) in authorEvents"
          :key="index"
          class="event-item-created relative"
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
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      userId: this.id,
    };
  },

  mounted() {
    console.log("Route query1:", this.$route.query.id);
    this.getAuthorEvents();
  },

  computed: {
    ...mapGetters({
      authorEvents: "getAuthorEvents",
      authorEventsStatus: "getAuthorEventsStatus",
    }),
  },

  methods: {
    async getAuthorEvents() {
      if (this.userId == null) {
        return;
      }
      await Promise.all([
        this.$store.dispatch("GET_AUTHOR_EVENTS", { id: this.userId }),
      ]);
    },
  },

  watch: {
    id(val) {
      this.userId = val;
      this.getAuthorEvents();
    },
  },
};
</script>

<style>
.event-item-created {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 80%;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  background-color: #ffffff;
}

.event-item-created:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.event-item-created a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.event-item-created a:hover {
  color: #007bff;
}
</style>

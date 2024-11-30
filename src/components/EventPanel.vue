<template>
  <div class="event-panel-container">
    <div class="event-panel flex text-center items-center flex-col px-2 gap-3">
      <div class="h-1/4" v-if="event.imageName != null">
        <img
          class="h-full w-full"
          :src="API_URL + '/images/' + event.imageName"
        />
      </div>
      <h1>{{ event.name }}</h1>
      <div v-if="event.startTime != null" class="flex flex-row">
        <h4>Початок:</h4>
        <p v-if="event.startTime != null">
          {{ convertJSONToDate(event.startTime) }}
        </p>
      </div>
      <div v-if="event.endTime != null" class="flex flex-row">
        <h4>Кінець:</h4>
        <p v-if="event.endTime != null">
          {{ convertJSONToDate(event.endTime) }}
        </p>
      </div>

      <p class="overflow-hidden" style="max-height: 25%">
        {{ truncatedDescription }}
      </p>
      <div class="flex flex-row mt-2 gap-2">
        <button class="button" @click="toEvent">Деталі</button>
        <button class="button-route" @click="toRoute">Маршрут</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      API_URL: import.meta.env.VITE_API_URL,
      maxDescriptionWords: 11,
    };
  },
  props: {
    event: Object,
  },
  computed: {
    truncatedDescription() {
      if(this.event.description != null){
      const words = this.event.description.split(" ");
      if (words.length > this.maxDescriptionWords) {
        return words.slice(0, this.maxDescriptionWords).join(" ") + "...";
      }
      return this.event.description;
    }
      return "";},
  },
  methods: {
    toEvent() {
      this.$router.push({ name: "event", query: { id: this.event.id } });
    },
    toRoute() {
      this.$parent.showRoute();
    },
    convertJSONToDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 25px;
  line-height: 2;
  font-weight: 550;
}
h4 {
  font-size: 18px;
  line-height: 1;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  display: inline;
  box-sizing: border-box;
}
p {
  font-size: 16px;
}
.event-panel-container {
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  justify-content: flex-start;
  z-index: 1000;
  height: 100%;
}
.event-panel {
  background: #ffffffc0;
  color: #000000;
  padding: 20px;
  border-radius: 0% 3% 0% 0%;
  font-size: 1.2rem;
  cursor: pointer;
  width: 23vw;
}
button {
  color: #000000;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 20px;
  margin: 10px;
  background-color: #007bff84;
  margin: auto;
}
.button-route {
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  background-color: #ff051584;
}
@media (max-width: 600px) {
  .event-panel-container {
    margin: 0;
    padding: 0;
    height: fit-content;
    max-height: 30%;
  }
  .event-panel {
    width: 100vw;
  }
  .img-fixed-size {
    display: none !important;
  }
}

.img-fixed-size {
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: center;
}
</style>

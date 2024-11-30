<template>
  <div v-if="event == {}">
    <q-spinner color="primary" size="3em" class="mx-auto" />
  </div>
  <div v-else>
    <div>
      <div class="TopLine">
        <q-btn flat style @click="backPage" icon="arrow_back" color="primary" />
        <div style="font-size: 16px; font-weight: 500">
          Editing your event details
        </div>
        <div v-show="showEditEventStepOne">
          <q-btn
            :disable="isNextDisabled"
            flat
            style
            @click="nextPage"
            label="Next"
            color="primary"
          />
        </div>
        <div v-show="showEditEventStepTwo">
          <q-btn
            flat
            style
            @click="updateEvent"
            label="Update event"
            color="primary"
          />
        </div>
      </div>
      <div v-show="showEditEventStepOne">
        <div class="inputStyle">
          <q-input
            square
            outlined
            v-model="event.name"
            label="Name"
            clearable
            :rules="[
              (val) => !!val || 'Необхідно заповнити',
              (val) => (val && val.length <= 50) || 'Не більше 50 символів',
              (val) =>
                (val &&
                  /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(val)) ||
                'Можливі лише літери, цифри та символи',
            ]"
          ></q-input>

          <TypeSelector
            :value="this.event.typeId"
            @input="(id) => (this.event.typeId = id)"
          />

          <div class="text-red-700 text-sm">
            {{ validateTime == true ? "" : validateTime }}
          </div>

          <DateTimeInput
            v-show="isTypeHistoric == false"
            class="mb-3"
            label="starting time"
            :value="event.startTime ?? null"
            :min="isTypeHistoric ? '' : new Date().toISOString()"
            @input="(v) => (event.startTime = v)"
          />

          <DateTimeInput
            v-show="isTypeHistoric == false"
            class="mb-6"
            label="ending time"
            :value="event.endTime ?? null"
            :min="event.startTime ?? null"
            @input="(v) => (event.endTime = v)"
          />

          <q-input
            square
            outlined
            v-model="event.coordinates"
            label="Address"
            clearable
            :rules="[(val) => !!val || 'Необхідно заповнити']"
            readonly
          ></q-input>
        </div>
        <div id="map3" class="map"></div>
      </div>
    </div>

    <div v-show="showEditEventStepTwo">
      <div style="display: flex; flex-direction: column; align-items: center">
        <div style="font-size: 16px; font-weight: 500; margin: 10px">
          Picture(s) of your event
        </div>
        <q-file
          v-model="files"
          label="Change picture"
          outlined
          multiple
          style="max-width: 300px"
        />
        <div style="font-size: 16px; font-weight: 500; margin: 10px">
          Description of your event
        </div>
        <q-input
          v-model="event.description"
          outlined
          autogrow
          style="width: 95%"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.TopLine {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.inputStyle {
  display: block;
  margin: auto;
  max-width: 95%;
  font-size: 25px;
}
.map {
  display: flex;
  position: absolute;
  width: 100%;
  height: 400px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 100px;
}
</style>

<script>
import TypeSelector from "../components/TypeSelector.vue";
import L from "leaflet";
import { getTimePlusFifteenMinutes } from "../convertDate";
import DateTimeInput from "src/components/DateTimeInput.vue";

export default {
  components: { TypeSelector, DateTimeInput },
  props: {
    id: { type: Number, required: true },
  },
  data() {
    return {
      event: {},
      autoResizeTextArea: "auto",
      showEditEventStepOne: true,
      showEditEventStepTwo: false,
      files: [],
      //Actual: true,
    };
  },

  computed: {
    type() {
      return this.$store.getters.getLeafTypes.find(
        (t) => t.id == this.event.typeId
      );
    },
    isTypeHistoric() {
      return this.type == null ? false : this.type.maxDuration == null;
    },
    isNextDisabled() {
      const timeValidation = this.validateTime;
      return !(
        this.event.name &&
        this.event.name.length <= 50 &&
        /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.event.name) &&
        this.event.typeId &&
        timeValidation === true &&
        this.event.coordinates
      );
    },
    validateTime() {
      if (this.isTypeHistoric == true) {
        return true;
      }

      if (!this.event.endTime || !this.event.startTime) {
        return "Оберіть час";
      }

      let maxHours = this.type?.maxDuration ?? 10;
      let diff =
        Math.abs(
          new Date(this.event.endTime) - new Date(this.event.startTime)
        ) / 36e5;

      if (diff > maxHours) {
        return "Тривалість події занадто велика для обраного типу.";
      }
      if (diff * 60 < 15) {
        return "Тривалість події занадто коротка.";
      }
      return true;
    },
  },

  async mounted() {
    await this.getEvent();
    this.event = JSON.parse(JSON.stringify(this.$store.getters.getEvent));
    this.showMap();
  },
  methods: {
    backPage() {
      if (this.showEditEventStepOne == true) {
        this.$router.go(-1);
      } else if (this.showEditEventStepTwo == true) {
        this.showEditEventStepTwo = false;
        this.showEditEventStepOne = true;
      }
    },

    nextPage() {
      if (!this.isNextDisabled) {
        this.showEditEventStepOne = false;
        this.showEditEventStepTwo = true;
      }
    },

    convertFileToDataUrl(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      } else {
        return "";
      }
    },

    async updateEvent() {
      this.event.dataUrl = await this.convertFileToDataUrl(this.files[0]);
      if (this.isTypeHistoric == true) {
        this.event.startTime = null;
        this.event.endTime = null;
      }
      this.$store.dispatch("PUT_EVENT", {
        formData: this.event,
        id: this.event.id,
        handler: (res) => {
          this.$store.dispatch("GET_EVENTS");
          this.$router.push({ name: "events-list", params: {} });
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        },
      });
    },
    async getEvent() {
      await Promise.all([
        this.event != {}
          ? this.$store.dispatch("GET_EVENT", { id: this.id })
          : undefined,
      ]);
    },
    showMap() {
      if (this.event != null) {
        const coordinates = this.event.coordinates.split(", ").map(parseFloat);
        const roundedCoordinates = coordinates.map((number) => {
          return number.toFixed(2);
        });
        const map = L.map("map3").setView(roundedCoordinates, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);
        var marker = L.marker(
          this.event.coordinates.split(", ").map(parseFloat)
        ).addTo(map);
        map.on("click", (event) => {
          const latlng = event.latlng;
          if (marker) {
            map.removeLayer(marker);
          }
          marker = L.marker(latlng).addTo(map);
          this.event.coordinates = `${latlng.lat}, ${latlng.lng}`;
        });
      }
    },
  },
  watch: {
    "event.startTime"(val) {
      if (this.event.endTime != null && val > this.event.endTime) {
        let end = getTimePlusFifteenMinutes(val);
        this.event.endTime = end;
      }
    },
    "event.endTime"(val) {
      if (val != null && val <= this.event.startTime) {
        this.event.endTime = this.event.startTime;
      }
    },
  },
};
</script>

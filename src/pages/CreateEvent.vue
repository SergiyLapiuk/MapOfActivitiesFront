<template>
  <div>
    <div class="TopLine">
      <q-btn flat style @click="backPage" icon="arrow_back" color="primary" />
      <div style="font-size: 16px; font-weight: 550">Деталі події</div>
      <div v-show="showCreateEventStepOne">
        <q-btn
          :disable="isNextDisabled"
          flat
          style
          @click="nextPage"
          label="Далі"
          color="primary"
        />
      </div>
      <div v-show="showCreateEventStepTwo">
        <q-btn
          flat
          style
          @click="createEvent"
          label="Створити"
          color="primary"
        />
      </div>
    </div>

    <div v-show="showCreateEventStepOne">
      <div class="inputStyle">
        <q-input
          square
          outlined
          v-model="name"
          label="Назва"
          clearable
          :rules="[
            (val) => !!val || 'Необхідно заповнити',
            (val) => (val && val.length <= 50) || 'Не більше 50 символів',
            (val) =>
              (val && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(val)) ||
              'Можливі лише літери, цифри та символи',
          ]"
        ></q-input>

        <TypeSelector
          :value="typeId"
          @input="(id) => (typeId = id)"
          :rules="[(val) => !!val || 'Необхідно заповнити']"
          class="mb-3"
        />

        <div class="text-red-700 text-sm">
          {{ validateTime == true ? "" : validateTime }}
        </div>

        <DateTimeInput
          v-show="isTypeHistoric == false"
          class="mb-3"
          label="Час початку"
          :value="startTime ?? null"
          :min="isTypeHistoric ? '' : new Date().toISOString()"
          @input="(v) => (startTime = v)"
        />

        <DateTimeInput
          v-show="isTypeHistoric == false"
          class="mb-6"
          label="Час закінчення"
          :value="endTime ?? null"
          :min="startTime ?? null"
          @input="(v) => (endTime = v)"
        />

        <!-- <div class="q-pa-md" style="max-width: 100%">
          <q-input
            flat
            style
            v-model="startTime"
            label="StartTime"
            :rules="[
              (val) => !!val || 'Необхідно заповнити',
              () => this.validateTime() === true || this.validateTime(),
            ]"
            readonly
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="startTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="startTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="q-pa-md" style="max-width: 100%">
          <q-input
            flat
            style
            v-model="endTime"
            label="EndTime"
            :rules="[
              (val) => !!val || 'Необхідно заповнити',
              () => this.validateTime() === true || this.validateTime(),
            ]"
            readonly
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="endTime" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="endTime" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div> -->

        <q-input
          square
          outlined
          v-model="address"
          label="Локація"
          clearable
          :rules="[(val) => !!val || 'Необхідно заповнити']"
          readonly
        ></q-input>
      </div>
      <div id="map2" class="map"></div>
    </div>
  </div>

  <div v-show="showCreateEventStepTwo">
    <div style="display: flex; flex-direction: column; align-items: center">
      <div style="font-size: 16px; font-weight: 500; margin: 10px">
        Картинка вашої події
      </div>
      <q-file
        v-model="files"
        label="Вибрати картинку"
        outlined
        multiple
        style="max-width: 300px"
      />
      <div style="font-size: 16px; font-weight: 500; margin: 10px">
        Опис вашої події (додатково)
      </div>
      <q-input v-model="description" outlined autogrow style="width: 95%" />
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
  z-index: 1;
  display: flex;
  position: absolute;
  width: 100%;
  height: 400px;
  margin: auto;
}
</style>

<script>
import TypeSelector from "../components/TypeSelector.vue";
import L from "leaflet";
import { getTimePlusFifteenMinutes } from "../convertDate";
import DateTimeInput from "src/components/DateTimeInput.vue";

export default {
  name: "CreateEvent",
  components: { TypeSelector, DateTimeInput },
  data() {
    const now = new Date();
    let currentTime = now.toISOString();
    const computedTime = getTimePlusFifteenMinutes(currentTime);

    return {
      name: "",
      typeId: null,
      startTime: currentTime,
      endTime: computedTime,
      address: "50.4454, 30.5635",
      picture: "",
      description: "",
      showCreateEventStepOne: true,
      showCreateEventStepTwo: false,
      map: null,
      files: [],
    };
  },

  computed: {
    type() {
      return this.$store.getters.getLeafTypes.find((t) => t.id == this.typeId);
    },
    isTypeHistoric() {
      return this.type == null ? false : this.type.maxDuration == null;
    },
    isNextDisabled() {
      const timeValidation = this.validateTime;

      return !(
        this.name &&
        this.name.length <= 50 &&
        /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.name) &&
        this.typeId &&
        timeValidation === true &&
        this.address
      );
    },
    validateTime() {
      if (this.isTypeHistoric == true) {
        return true;
      }

      if (!this.endTime || !this.startTime) {
        return "Оберіть час";
      }

      let maxHours = this.type?.maxDuration ?? 10;
      let diff =
        Math.abs(new Date(this.endTime) - new Date(this.startTime)) / 36e5;

      if (diff > maxHours) {
        return "Тривалість події занадто велика для обраного типу.";
      }
      if (diff * 60 < 15) {
        return "Тривалість події занадто коротка.";
      }
      return true;
    },
  },
  mounted() {
    this.showMap();
  },
  methods: {
    backPage() {
      if (this.showCreateEventStepOne == true) {
        this.$router.go(-1);
      } else if (this.showCreateEventStepTwo == true) {
        this.showCreateEventStepTwo = false;
        this.showCreateEventStepOne = true;
      }
    },

    nextPage() {
      if (!this.isNextDisabled) {
        this.showCreateEventStepOne = false;
        this.showCreateEventStepTwo = true;
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

    async createEvent() {
      if (this.isTypeHistoric == true) {
        this.startTime = null;
        this.endTime = null;
      }
      this.$store.dispatch("POST_EVENT", {
        formData: {
          name: this.name,
          typeId: this.typeId,
          description: this.description,
          startTime: this.startTime,
          endTime: this.endTime,
          coordinates: this.address,
          dataUrl: await this.convertFileToDataUrl(this.files[0]),
        },
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
    showMap() {
      this.map = L.map("map2").setView([50.44, 30.56], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(this.map);
      let marker = null;
      this.map.on("click", (event) => {
        const latlng = event.latlng;
        if (marker) {
          this.map.removeLayer(marker);
        }
        marker = L.marker(latlng).addTo(this.map);
        this.address = `${latlng.lat}, ${latlng.lng}`;
      });
    },
  },
  watch: {
    startTime(val) {
      if (this.endTime != null && val > this.endTime) {
        let end = getTimePlusFifteenMinutes(val);
        this.endTime = end;
      }
    },
    endTime(val) {
      if (val != null && val <= this.startTime) {
        this.endTime = this.startTime;
      }
    },
  },
};
</script>

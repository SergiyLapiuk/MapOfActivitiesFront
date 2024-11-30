<template>
  <top-panel @showFilters="showFilters = !showFilters" :searchText="searchName" @updateText="(text) => search(text)">
  </top-panel>
  <div v-if="eventsStatus == 'loading'" class="status">
    <q-spinner color="primary" size="3em" class="mx-auto" />
  </div>
  <div v-else-if="eventsStatus == 'error'" class="status">
    Щось пішло не так - певно, проблеми зі з'єднанням.
  </div>
  <div v-show="eventsStatus == 'success'">
    <div id="map5" class="map" @click="closeEventPanel"></div>
    <button id="custom-button" @click="userLocation" class="leaflet-control leaflet-bar">
      <i id="userLocationIcon" class="fa-solid fa-location-crosshairs"></i>
    </button>
  </div>

  <EventPanel v-if="showPanel" :event="selectedEvent" />

  <q-drawer v-model="showFilters" side="left" class="w-fit">
    <EventFilters class="p-3 h-full" @close="showFilters = false" @update="(f) => update(f)" />
  </q-drawer>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import EventPanel from "../components/EventPanel.vue";
import { mapGetters } from "vuex";
import TopPanel from "src/components/TopPanel.vue";
import EventFilters from "src/components/FiltersPanel.vue";

export default {
  components: {
    EventPanel,
    TopPanel,
    EventFilters,
  },
  data() {
    return {
      isSearchActive: false,
      location: "",
      map: null,
      showPanel: false,
      selectedEvent: null,
      showFilters: false,
      searchName: "",
      iconsLayer: new L.LayerGroup(),
      routeControl: null,
    };
  },
  computed: {
    ...mapGetters({
      events: "getEvents",
      eventsStatus: "getEventsStatus",
      event: "getEvent",
      eventStatus: "getEventStatus",
      leafTypes: "getLeafTypes",
    }),
  },
  async mounted() {
    await this.getEvents();
    this.showMap();
    this.addIconsOnMap();
    this.setuserLocationIcon();
  },

  methods: {
    async getEvents() {
      await Promise.all([
        this.events.length < 1 ? this.$store.dispatch("GET_EVENTS") : undefined,
      ]);
    },
    async update(filters) {
      console.log("up: " + JSON.stringify(filters));
      await Promise.all([
        this.$store.dispatch("GET_EVENTS", {
          filters: {
            ...filters,
          },
          searchName: this.searchName,
        }),
      ]);
      this.showFilters = false;
      this.addIconsOnMap();
    },
    async search(text) {
      this.searchName = text;
      await Promise.all([
        this.$store.dispatch("GET_EVENTS", {
          searchName: this.searchName,
        }),
      ]);
      this.addIconsOnMap();
    },
    showEventPanel() {
      this.showPanel = true;
      console.log("showEventPanel: " + this.selectedEvent);
    },
    closeEventPanel() {
      this.showPanel = false;
    },
    // async userLocation() {
    //   if ("geolocation" in navigator && this.location.length == 0) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         this.locationAvailable = true;
    //         this.location = `${position.coords.latitude}, ${position.coords.longitude}`;
    //         console.log(this.location);
    //         let marker = L.marker(
    //           this.location.split(", ").map(parseFloat)
    //         ).addTo(this.map);
    //         marker.bindPopup("Hi");
    //         this.map.setView(this.location.split(", ").map(parseFloat), 13);
    //       },
    //       (error) => {
    //         this.locationAvailable = false;
    //         console.error("Error getting location: " + error.message);
    //       },
    //       { enableHighAccuracy: true }
    //     );
    //   } else if (this.location.length != 0) {
    //     this.map.setView(this.location.split(", ").map(parseFloat), 13);
    //   } else {
    //     this.locationAvailable = false;
    //     console.error("Geolocation is not available in this browser.");
    //   }
    // },
    async userLocation() {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator && this.location.length === 0) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.locationAvailable = true;
              this.location = `${position.coords.latitude}, ${position.coords.longitude}`;
              console.log(this.location);
              let marker = L.marker(
                this.location.split(", ").map(parseFloat)
              ).addTo(this.map);
              marker.bindPopup("Hi");
              this.map.setView(this.location.split(", ").map(parseFloat), 13);

              // Resolve the Promise with the location
              resolve(this.location);
            },
            (error) => {
              this.locationAvailable = false;
              console.error("Error getting location: " + error.message);

              // Reject the Promise with an error
              reject(new Error("Error getting location"));
            },
            { enableHighAccuracy: true }
          );
        } else if (this.location.length !== 0) {
          this.map.setView(this.location.split(", ").map(parseFloat), 13);

          // Resolve the Promise with the location
          resolve(this.location);
        } else {
          this.locationAvailable = false;
          console.error("Geolocation is not available in this browser.");

          // Reject the Promise with an error
          reject(new Error("Geolocation is not available"));
        }
      });
    },
    setuserLocationIcon() {
      const map = this.map;
      const mapLoadedPromise = new Promise((resolve) => {
        map.on("load", () => {
          resolve();
        });
      });
      mapLoadedPromise.then(() => {
        const customControl = L.Control.extend({
          options: {
            position: "top-left",
          },
          onAdd: function (map) {
            const container = L.DomUtil.create(
              "div",
              "leaflet-control-wrapper"
            );
            const button = L.DomUtil.get("custom-button");
            L.DomEvent.on(button, "click", this.userLocation, this);
            return container;
          },
        });
        map.addControl(new customControl());
      });
    },
    baseIcon(iconClass) {
      let icon;
      if (iconClass.startsWith("<svg")) {
        icon = iconClass;
      } else {
        icon = `<img src="${this.getIconPath(iconClass)}" class="h-4"/>`;
      }
      const bIcon = L.divIcon({
        html: `<div >
                <div class="icon-background">
                  <div style="transform: rotate(45deg);" class="w-4 h-4">
                  ${icon}
                  </div>
                </div>
                </div>`,
        iconSize: [5, 5],
      });
      return bIcon;
    },
    showMap() {
      if (this.events != null) {
        this.map = L.map("map5").setView([50.44, 30.56], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(this.map);
      }
    },
    async addIconsOnMap() {
      this.iconsLayer.clearLayers();
      for (let i = 0; i < this.events.length; i++) {
        const cIcon = this.baseIcon(this.events[i].type?.typeIcon);
        L.marker(this.events[i].coordinates.split(", ").map(parseFloat), {
          icon: cIcon,
        })
          .on("click", async () => {
            await this.getEvent(this.events[i].id);
            this.selectedEvent = this.event;
            console.log(this.selectedEvent);
            this.showEventPanel();
          })
          .addTo(this.iconsLayer);
      }
      this.iconsLayer.addTo(this.map);
    },
    async getEvent(id) {
      await Promise.all([
        this.event != {}
          ? this.$store.dispatch("GET_EVENT", { id: id })
          : undefined,
      ]);
    },
    filterPage() {
      if (!this.isNextDisabled) {
        this.$router.push("/event-filter");
      }
    },
    async showRoute() {
      if (this.routeControl) {
        this.map.removeControl(this.routeControl);
      }
      await this.userLocation();
      console.log(this.location);
      console.log(this.selectedEvent.coordinates);
      this.routeControl = L.Routing.control({
        waypoints: [
          L.latLng(
            this.location.split(", ").map(parseFloat)[0],
            this.location.split(", ").map(parseFloat)[1]
          ),
          L.latLng(
            this.selectedEvent.coordinates.split(", ").map(parseFloat)[0],
            this.selectedEvent.coordinates.split(", ").map(parseFloat)[1]
          ),
        ],
        routeWhileDragging: true,
        show: false,
        createMarker: function () {
          return null;
        },
        profile: "driving-car",
      }).addTo(this.map);
    },
    getIconPath(icon) {
      return new URL(`../assets/icons/${icon}.png`, import.meta.url).href;
    },
  },
};
</script>
<style>
.leaflet-right {
  display: none !important;
}

.icon-background {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background-color: #ffffff;
  border-radius: 50% 50% 50% 0;
  transform: translate(0px, -15px) rotate(-45deg);
}

.leaflet-div-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style scoped>
#icon-container {
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.map {
  display: flex;
  position: absolute;
  width: 100%;
  height: 90%;
  margin: auto;
}

#custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 33px;
  height: 33px;
  top: 80px;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: none;
  margin-left: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-top-color: rgba(0, 0, 0, 0.2);
  border-right-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-left-color: rgba(0, 0, 0, 0.2);
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  background-clip: padding-box;
}

#userLocationIcon {
  color: #000000;
  z-index: 100;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

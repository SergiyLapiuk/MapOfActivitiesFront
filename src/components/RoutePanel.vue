<template>
  <div class="route-panel-container">
    <div class="route-panel flex text-center items-center flex-col px-2 gap-3">
      <h1>Підказки</h1>
      <div v-for="(event, index) in events" :key="index" class="event">
        <div>{{ event.name }}</div>
        <!-- <button @click="deleteEvent(index)">Видалити</button> -->
      </div>

      <!-- <div class="flex flex-row mt-2 gap-2">
        <button class="button" @click="addEvent">Add</button>
        <button class="button-route" @click="buildRoute">Route</button>
      </div> -->
    </div>
  </div>
</template>

<script>
// import L from "leaflet";
// import "leaflet-routing-machine";
export default {
  data() {
    return {
      events: [],
    };
  },
  props: {
    currentEvent: Object,
    listOfEvents: Object,
    routeWayPoints: Object,
  },
  async mounted() {
    this.events.push(this.currentEvent);
    // await this.findEvents();
  },
  watch: {
    selectedEvent: function (newValue, oldValue) {
      if (!this.events.some(event => event.id === newValue.id)) {
        this.events.push(newValue);
      }
    }
  },
  methods: {
    workWithTime(endTime, minDistance) {
      let initialDate = new Date(endTime);
      let secondsToAdd = minDistance * 2 / 1.4;
      let newDate = new Date(initialDate.getTime() + secondsToAdd * 1000);
      console.log(newDate.toISOString())
      return newDate.toISOString();
    },
    // async buildControl(minCoordinate, w2) {
    //   let controlLol = L.Routing.control({
    //     waypoints: [
    //       minCoordinate,
    //       w2,
    //     ],
    //     routeWhileDragging: true,
    //     show: false,
    //     createMarker: function () {
    //       return null;
    //     },
    //     profile: "driving-car",
    //   })
    //   //controlLol.calculateRoute();
    //   console.log("Route is made");
    //   return controlLol;
    // },
    async buildControl(minCoordinate, w2) {
      return new Promise(async (resolve, reject) => {
        let controlLol = await Promise.all([L.Routing.control({
          waypoints: [
            minCoordinate,
            w2,
          ],
          routeWhileDragging: true,
          show: false,
          createMarker: function () {
            return null;
          },
          profile: "driving-car",
        })]);

        console.log(controlLol);
        controlLol.on('routesfound', (e) => {
          resolve(controlLol); // Вирішуємо проміс з контролем маршруту
        });

        // Якщо виникає помилка при створенні контролю маршруту
        controlLol.on('routingerror', (err) => {
          reject(err);
        });

        console.log("Route is made");
      });
    },
    async findEvents() {
      console.log(this.listOfEvents)
      console.log(this.routeWayPoints)
      console.log(this.currentEvent);
      let firstRoute = null;
      const routesFoundPromise = new Promise((resolve) => {
        this.routeWayPoints.on('routesfound', async (event) => {
          const routes = event.routes;
          console.log(routes[0].coordinates);
          firstRoute = routes[0].coordinates;
          resolve(); // Signal completion of the event
        });
      });
      await routesFoundPromise;
      if (!firstRoute) { return; }
      const newEventList = [];
      if (this.listOfEvents) {
        this.listOfEvents.forEach(async (choosenEvent) => {
          let minDistance = 1000;
          let minCoordinate = 0;
          console.log(choosenEvent);
          firstRoute.forEach((coordinate) => {
            const distance = (L.latLng(choosenEvent.coordinates.split(", ").map(parseFloat)[0], choosenEvent.coordinates.split(", ").map(parseFloat)[1])).distanceTo(coordinate);
            if (minDistance > distance) {
              minDistance = distance;
              minCoordinate = coordinate;
            }
          });
          if (minDistance < 700) {
            console.log(minDistance);
            console.log(this.currentEvent.startTime);
            let b = this.currentEvent.startTime > this.workWithTime(choosenEvent.endTime, minDistance)
            console.log(b);
            if (this.currentEvent.startTime != null && this.currentEvent.startTime > this.workWithTime(choosenEvent.endTime, minDistance)) {
              let w2 = L.latLng(
                this.currentEvent.coordinates.split(", ").map(parseFloat)[0],
                this.currentEvent.coordinates.split(", ").map(parseFloat)[1]
              )
              console.log("start:" + minCoordinate + "   " + w2);
              // let rWP1 = new L.Routing.Waypoint;
              // rWP1.latLng = minCoordinate;

              // let rWP2 = new L.Routing.Waypoint;
              // rWP2.latLng = w2;
              // var myRoute = L.Routing.osrmv1();
              // console.log(myRoute);
              // myRoute.route([rWP1, rWP2], function (err, routes) {
              //   distance = routes[0].summary.totalDistance;
              //   console.log('routing distance: ' + distance);
              // });
              //let controlLol = await this.buildControl(minCoordinate, w2);
              this.buildControl(minCoordinate, w2).then((controlLol) => {
                console.log(controlLol);
                controlLol.on('routesfound', async (e) => {
                  var routes = e.routes;
                  var distance = routes[0].summary.totalDistance;
                  console.log(distance);
                  console.log(this.workWithTime(choosenEvent.endTime, minDistance));
                  if (this.currentEvent.startTime > this.workWithTime(this.workWithTime(choosenEvent.endTime, minDistance), distance / 2)) {
                    newEventList.push(minDistance, minCoordinate);
                    console.log(minDistance, minCoordinate);
                  }
                });
                console.log("Route end");
              });
            }
          }
          minDistance = 1000;
        })
        console.log(newEventList);
      }
    },

    buildRoute() {
      this.$parent.showUnitedRoute(this.events);
    },
    addEvent() {
      this.$emit('addEvent');
    },
    deleteEvent(index) {
      this.events.splice(index, 1);
    }
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

.route-panel-container {
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  justify-content: flex-start;
  z-index: 1000;
  height: 100%;
}

.route-panel {
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
  .route-panel-container {
    margin: 0;
    padding: 0;
    height: fit-content;
    max-height: 30%;
  }

  .route-panel {
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

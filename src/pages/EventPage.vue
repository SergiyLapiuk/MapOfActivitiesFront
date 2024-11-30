<template>
  <div v-show="EventPage">

    <div v-if="event != null && event.type != null" class="p-3">
      <div class="navbar">
        <div>
          <h1 class="!px-0">{{ event.name }}</h1>
          <h4 class="!px-0">{{ event.type.name }}</h4>
        </div>
        <div v-show="showReportButton" class="ml-auto">
          <q-btn @click="reportPage" label="Скарга" color="orange-10" />
        </div>
        <button :class="{ 'bg-red-700': !isSubscribed, 'bg-gray-700': isSubscribed }" class="join-button !mx-0"
          @click="joinEvent">
          {{ buttonText }}
        </button>
      </div>
      <div class="col_conteiner">
        <div class="column">
          <div v-if="event.imageName != null">
            <img class="w-full" :src="API_URL + '/images/' + event.imageName" style="margin-bottom: 20px" />
          </div>
          <div class="text_conteinet" v-if="event.description != null && event.description != ``">
            <!-- <h2>Description</h2> -->
            <p>{{ event.description }}</p>
          </div>
          <div class="text_conteinet px-4" v-if="eventUsers?.length != 0">
            <h2>До події приєднались:</h2>
            <div class="users-avatar-container">
              <div v-for="user in eventUsers" :key="user.id" class="avatars-container">
                <router-link :to="'/profile-page?id=' + user.userId">
                  <img v-if="user.imageURL" :src="this.API_URL + '/images/' + user.imageURL" class="users-image" />
                  <div v-else class="users-icon-container">
                    <ProfileIcon />
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="white_conteiner">
            <h2>Час</h2>
            <p>Початок: {{ convertJSONToDate(event.startTime) }}</p>
            <p>Кінець: {{ convertJSONToDate(event.endTime) }}</p>
          </div>
          <div v-if="event.coordinates != null" class="white_conteiner">
            <h2>Локація</h2>
            <h3 style="line-height: 1">{{ fullAddress }}</h3>
            <h3 style="line-height: 2">({{ event.coordinates }})</h3>
            <div id="map4" class="map"></div>
          </div>
          <div v-if="event.user != null" class="white_conteiner">
            <h2>Автор</h2>
            <p>{{ event.user.name }}</p>
          </div>
        </div>
      </div>

      <button v-if="curUser != null && (curRole == 'Admin' || curUser == event.user.userId)
    " class="delete-button" @click="showDialog = true">
        Видалити подію
      </button>
      <dialog-confirmation :show-dialog="showDialog" :message="confirmationMessage" @confirmed="deleteEvent"
        @canceled="showDialog = false" />
      <button v-if="curUser != null && (curRole == 'Admin' || curUser == event.user.userId)
    " class="edit-button" @click="editEvent">
        Редагувати подію
      </button>
    </div>
  </div>

  <div v-show="showReportDetails">
    <div class="TopLine">
      <q-btn flat style @click="backToEventPage" icon="arrow_back" color="primary" />
      <div style="font-size: 16px; font-weight: 550">Деталі скарги на подію</div>
      <q-btn flat style @click="reportEvent" label="Відправити" color="primary" />
    </div>
    <div class="inputStyle">
      <div style="font-size: 16px; font-weight: 500; margin: 10px">
        Виберіть заголовок для скарги
      </div>
      <q-select outlined v-model="reportHeader" :options="options" />
      <div style="font-size: 16px; font-weight: 500; margin: 10px">
        Детальний опис Вашої скарги (опціонально)
      </div>
      <q-input v-model="reportDescription" outlined autogrow clearable />
    </div>
  </div>

</template>

<script>
import L from "leaflet";
import DialogConfirmation from "components/DialogConfirmation.vue";
import { mapGetters } from "vuex";
import { convertJSONToDate } from "../convertDate";
import ProfileIcon from "components/icons/ProfileIcon.vue";

export default {
  components: {
    ProfileIcon,
  },
  data() {
    return {
      showDialog: false,
      confirmationMessage: "Ви впевнені, що хочете видалити цю подію?",
      API_URL: import.meta.env.VITE_API_URL,
      buttonColor: "#1ab240",
      isSubscribed: false,
      curUser: null,
      curRole: null,
      fullAddress: null,
      EventPage: true,
      showReportDetails: false,
      reportHeader: null,
      reportDescription: "",
      showReportButton: true,
      options: [
        'Нецензурне назва події',
        'Нецензурна фотографія події',
        'Некоректна/фальшива фотографія події',
        'Некоректна локація події',
        'Некоректний час події',
        'Невідповідні дані',
        'Фальшива подія',
        'Інше'
      ]
    };
  },
  props: {
    id: { type: [Number, String], required: true },
  },
  computed: {
    ...mapGetters({
      event: "getEvent",
      eventStatus: "getEventStatus",
      eventUsers: "getEventUsers",
      usersStatus: "getVisitingUsersStatus",
      joined: "getJoined",
      joinedStatus: "getJoinedStatus",
      profile: "getProfile",
    }),

    isNextDisabled() {
      return !(
        this.name &&
        this.name.length <= 50 &&
        /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(this.name) &&
        this.typeId &&
        timeValidation === true &&
        this.address
      );
    },

    buttonText: function () {
      return this.isSubscribed ? "Від'єднатись" : "Приєднатись";
    },
    filteredEvent() {
      const filteredFields = [
        "name",
        "type",
        "startTime",
        "endTime",
        "description",
        "coordinates",
        "user",
      ];

      const filterObject = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([key, value]) => {
            if (
              filteredFields.includes(key) &&
              value !== null &&
              value !== "" &&
              value !== undefined
            ) {
              return true;
            }
            return false;
          })
        );
      };

      return filterObject(this.event);
    },
  },

  async mounted() {
    await this.getEvent();
    await this.getCurUser();
    await this.getEventUsers();
  },

  methods: {
    backToEventPage() {
      this.showReportDetails = false;
      this.EventPage = true;
    },
    reportPage() {
      this.showReportDetails = true;
      this.EventPage = false;
    },
    convertJSONToDate(date) {
      return convertJSONToDate(date);
    },
    deleteEvent() {
      console.log(this.curRole);
      this.$store.dispatch("DELETE_EVENT", {
        id: this.id,
        handler: (res) => {
          this.$store.dispatch("GET_EVENTS");
          this.$router.push({ name: "events-list", params: {} });
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors.response.data);
        },
      });
    },
    editEvent() {
      //console.log(this.event.id);
      this.$router.push({
        name: "edit-event",
        params: this.event,
        query: { event: this.event.id },
      });
    },
    async joinEvent() {
      this.isSubscribed = !this.isSubscribed;
      const userId = this.$store.getters.getCurrentUser;
      if (this.isSubscribed) {
        this.$store.dispatch("CREATE_VISITING", {
          id: userId,
          eventId: this.event.id,
          handler: (res) => { },
          handlerError: (errors) => {
            alert("Error occurred: " + errors);
          },
        });
      } else {
        this.$store.dispatch("DELETE_VISITING", {
          id: userId,
          eventId: this.event.id,
          handler: (res) => { },
          handlerError: (errors) => {
            alert("Error occurred: " + errors);
          },
        });
      }
    },
    showMap() {
      if (this.event != null) {
        const coordinates = this.event.coordinates.split(", ").map(parseFloat);
        const roundedCoordinates = coordinates.map((number) => {
          return number.toFixed(2);
        });
        const map = L.map("map4").setView(roundedCoordinates, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map);
        var marker = L.marker(
          this.event.coordinates.split(", ").map(parseFloat)
        ).addTo(map);
        this.getAddressFromCoordinates(coordinates[0], coordinates[1]);
      }
    },
    async getEvent() {
      await Promise.all([
        this.event != {}
          ? this.$store.dispatch("GET_EVENT", { id: this.id })
          : undefined,
      ]);
      this.showMap();
    },
    async getAddressFromCoordinates(latitude, longitude) {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.address) {
          const address = data.display_name;
          this.fullAddress = address;
        } else {
          console.error("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    },
    async getCurUser() {
      this.curUser = this.$store.getters.getCurrentUser;
      this.curRole = this.$store.getters.getCurrentRole;
      const eventsId = this.$store.getters.getEvent.id;
      await Promise.all([
        this.$store.dispatch("GET_IS_JOINER", {
          id: this.curUser,
          eventId: eventsId,
        }),
      ]);
      this.isSubscribed = this.$store.getters.getJoined;

      if (this.curUser != this.event.user.userId) {
        this.showReportButton = true;
      }
      else {
        this.showReportButton = false;
      }
    },

    async getEventUsers() {
      const eventsId = this.$store.getters.getEvent.id;
      await Promise.all([
        this.$store.dispatch("GET_USERS_GO_TO_THE_EVENT", {
          eventId: eventsId,
        }),
      ]);
      this.eventUsers = this.$store.getters.getEventUsers;
      console.log(this.eventUsers)
    },

    async reportEvent() {
      if (!this.reportHeader) {
        alert('Будь ласка, виберіть заголовок для вашої скарги');
        return;
      }
      if (this.reportHeader === 'Інше' && !this.reportDescription) {
        alert('Ви вибрали заголовок "Інше", будь ласка, додайте опис Вашої скарги');
        return;
      }
      const user = this.$store.getters.getProfile;
      this.$store.dispatch("REPORT_EVENT", {
        formData: {
          Header: this.reportHeader,
          Description: this.reportDescription,
          EventId: this.event.id,
          AuthorId: user.id,
        },
        handler: (res) => {
          this.$router.replace({ path: "/event-page", name: "event", query: { id: this.event.id } });
          this.showReportDetails = false;
          this.EventPage = true;
          this.reportHeader = "";
          this.reportDescription = "";
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        },
      });
    },
  },
  components: {
    DialogConfirmation,
  },
};
</script>

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

.navbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

h1 {
  font-size: 25px;
  font-weight: 900;
  line-height: 2;
}

h4 {
  line-height: 1;
  padding: 0px 12px;
}

h2 {
  font-size: 18px;
  font-weight: bold;
  line-height: 2;
}

.col_conteiner {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.column {
  flex: 1;
}

.white_conteiner {
  background: #fff;
  margin-bottom: 20px;
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  margin: auto;
  margin-top: 0;
  margin-bottom: 20px;
}

.map {
  width: 100%;
  height: 300px;
  margin: 0;
  margin-top: 20px;
  margin-bottom: 20px;
  z-index: 1000;
}

.text_conteinet {
  display: inline-block;
  box-sizing: border-box;
}

.event-details-table {
  border-collapse: collapse;
  width: 100%;
}

.table-cell {
  border: 2px solid #000000;
  padding: 8px;
  text-align: left;
}

.table-cell:first-child {
  border-left: none;
}

.table-cell:last-child {
  border-right: none;
}

.table-cell:first-child {
  font-weight: bold;
}

button {
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 15px;
  margin: 30px;
}

.delete-button {
  background-color: #dc3545;
}

.edit-button {
  background-color: #007bff;
}

.join-button {
  font-size: 18px;
}

.users-avatar-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 30px;
}

.avatars-container {
  display: flex;
  align-items: center;
}

.users-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.users-icon-container {
  width: 40px;
  height: 40px;
}

@media (max-width: 600px) {

  h1 {
    font-size: 20px;
    padding: 0px 12px;
    line-height: 2;
  }

  h4 {
    line-height: 1;
    padding: 0px 12px;
  }

  .col_conteiner {
    margin-top: 10px;
    display: block;
  }

  .column {
    display: block;
  }

  .white_conteiner {
    width: 100%;
  }

  button {
    padding: 6px 12px;
    font-size: 14px;
    margin: 10px;
  }

  .join-button {
    font-size: 16px;
  }
}

.img-fixed-size {
  display: block;
  margin: auto;
  width: 400px;
  height: 400px;
  object-fit: cover;
  object-position: center;
}
</style>

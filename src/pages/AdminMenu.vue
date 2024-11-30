<template>
  <div class="">
    <div class="AdminTopLine">
      Admin: {{ profile.email }} - {{ profile.name }}
    </div>

    <div class="TopButtons">
      <q-btn @click="loadUsers" label="Користувачі" color="green-10" />
      <q-btn @click="loadComplaints" label="Скарги" color="orange-14" />
      <q-btn @click="loadLogs" label="Логи" color="red-14" />
    </div>

    <div v-show="loadUsersComponent">
      <q-input
        class="search"
        type="text"
        v-model="searchWord"
        placeholder="Введіть символи для пошуку"
      >
      </q-input>
      <div class="filters1 q-gutter-xs">
        <q-btn
          label="Всі користувачі"
          @click="searchType = 'all'"
          :class="{ active: isSearchTypeActive('all') }"
        />
        <q-btn
          label="ID пошук"
          @click="searchType = 'id'"
          :class="{ active: isSearchTypeActive('id') }"
        />
        <q-btn
          label="Пошук за поштою"
          @click="searchType = 'email'"
          :class="{ active: isSearchTypeActive('email') }"
        />
        <q-btn
          label="Пошук за роллю"
          @click="searchType = 'role'"
          :class="{ active: isSearchTypeActive('role') }"
        />
      </div>
      <div v-if="status == 'loading'" class="status">
        <q-spinner color="primary" size="3em" class="mx-auto" />
      </div>
      <div v-else-if="status == 'error'" class="status">
        Щось пішло не так - певно, проблеми зі з'єднанням.
      </div>
      <div v-else>
        <div class="scrollable-container2">
          <div
            v-for="(user, index) in filteredUsers"
            :key="index"
            class="event-item relative"
          >
            <router-link :to="'/profile-page?id=' + user.id">
              {{ user.id }} - {{ user.email }} - {{ user.roles }}
            </router-link>
            <div class="flex mt-2" style="gap: 10px">
              <q-btn
                label="Забанити"
                @click="banUser(user.id)"
                color="positive"
                :disable="
                  user.roles.includes('BannedUser') ||
                  user.roles.includes('Admin')
                "
              />
              <q-btn
                label="Розбанити"
                @click="unBanUser(user.id)"
                color="positive"
                :disable="
                  user.roles.includes('User') || user.roles.includes('Admin')
                "
              />
              <q-btn
                label="Видалити акаунт користувача"
                @click="deleteUser(user.id)"
                color="red-14"
                :disable="user.roles.includes('Admin')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="loadComplaintsComponent" class="w-full flex h-[90vh]">
      <div class="w-1/2 flex flex-col max-h-full">
        <div class="text-center mb-2"> <b>Скарги на користувачів</b></div>
        <q-input
          type="text"
          v-model="searchWordUsersComplaints"
          placeholder="Введіть символи для пошуку"
          style="margin-left: 5%; margin-right: 5%;"
        >
        </q-input>
        <div class="filters q-gutter-xs">
          <q-btn
            label="Всі скарги на користувачів"
            @click="searchTypeUsersComplaints = 'all'"
            :class="{ active: isSearchUserTypeActive('all') }"
          />
          <q-btn
            label="Пошук за заголовком"
            @click="searchTypeUsersComplaints = 'header'"
            :class="{ active: isSearchUserTypeActive('header') }"
          />
          <q-btn
            label="Пошук за поштою"
            @click="searchTypeUsersComplaints = 'email'"
            :class="{ active: isSearchUserTypeActive('email') }"
          />
        </div>
        <div class="overflow-auto flex-1">
          <div
            v-for="(userComplaint, index) in filteredUsersComplaints"
            :key="index"
            class="event-complaint relative"
          >
            <b>
              {{
                userComplaint.header === "Інше"
                  ? "Інше: " + userComplaint.description
                  : userComplaint.header
              }}
            </b>
            <br />
            <b>Користувач: </b>
            <router-link
              :to="'/profile-page?id=' + userComplaint.userId"
              class="clickable-link"
              style="font-weight: normal"
            >
              {{ userComplaint.userEmail }} <br />
            </router-link>
            <b>Опис:</b> {{ userComplaint.description }}<br />
            <b>Автор скарги: </b>
            <router-link
              :to="'/profile-page?id=' + userComplaint.authorId"
              class="clickable-link"
              style="font-weight: normal"
            >
              {{ userComplaint.authorEmail }} <br />
            </router-link>
            <b>Час надхоження скарги:</b>
            {{ convertJSONToDate(userComplaint.time) }}<br />
            <b>Статус:</b> {{ userComplaint.status }}<br />
            <div class="flex mt-2" style="gap: 10px">
              <q-btn
                label="Опрацьовано"
                @click="putStatusComplaint(userComplaint.id, 'process')"
                color="green-10"
                :disabled="
                  userComplaint &&
                  userComplaint.status &&
                  (userComplaint.status.startsWith('Опрацьовано') ||
                    userComplaint.status.startsWith('Відхилено'))
                "
              />
              <q-btn
                label="Відхилити"
                @click="putStatusComplaint(userComplaint.id, 'reject')"
                color="red-14"
                :disabled="
                  userComplaint &&
                  userComplaint.status &&
                  (userComplaint.status.startsWith('Опрацьовано') ||
                    userComplaint.status.startsWith('Відхилено'))
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 flex flex-col h-[90vh]">
        <div class="text-center mb-2"> <b>Скарги на події</b></div>
        <q-input
          type="text"
          v-model="searchWordEventsComplaints"
          placeholder="Введіть символи для пошуку"
          style="margin-left: 5%; margin-right: 5%;"
        >
        </q-input>
        <div class="filters q-gutter-xs">
          <q-btn
            label="Всі скарги на події"
            @click="searchTypeEventsComplaints = 'all'"
            :class="{ active: isSearchEventTypeActive('all') }"
          />
          <q-btn
            label="Пошук за заголовком"
            @click="searchTypeEventsComplaints = 'header'"
            :class="{ active: isSearchEventTypeActive('header') }"
          />
          <q-btn
            label="Пошук за номером події"
            @click="searchTypeEventsComplaints = 'id'"
            :class="{ active: isSearchEventTypeActive('id') }"
          />
        </div>
        <div class="overflow-auto flex-1">
          <div
            v-for="(eventComplaint, index) in filteredEventsComplaints"
            :key="index"
            class="event-complaint relative"
          >
            <b>
              {{
                eventComplaint.header === "Інше"
                  ? "Інше: " + eventComplaint.description
                  : eventComplaint.header
              }}
            </b>
            <br />
            <b>Номер події: </b>
            <router-link
              :to="'/event-page?id=' + eventComplaint.eventId"
              class="clickable-link"
              style="font-weight: normal"
            >
              {{ eventComplaint.eventId }} <br />
            </router-link>
            <b>Опис:</b> {{ eventComplaint.description }}<br />
            <b>Автор скарги: </b>
            <router-link
              :to="'/profile-page?id=' + eventComplaint.authorId"
              class="clickable-link"
              style="font-weight: normal"
            >
              {{ eventComplaint.authorEmail }} <br />
            </router-link>
            <b>Час надходження скарги:</b>
            {{ convertJSONToDate(eventComplaint.time) }}<br />
            <b>Статус:</b> {{ eventComplaint.status }}<br />
            <div class="flex mt-2" style="gap: 10px">
              <q-btn
                label="Опрацьовано"
                @click="putStatusComplaint(eventComplaint.id, 'process')"
                color="green-10"
                :disabled="
                  eventComplaint &&
                  eventComplaint.status &&
                  (eventComplaint.status.startsWith('Опрацьовано') ||
                    eventComplaint.status.startsWith('Відхилено'))
                "
              />
              <q-btn
                label="Відхилити"
                @click="putStatusComplaint(eventComplaint.id, 'reject')"
                color="red-14"
                :disabled="
                  eventComplaint &&
                  eventComplaint.status &&
                  (eventComplaint.status.startsWith('Опрацьовано') ||
                    eventComplaint.status.startsWith('Відхилено'))
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="loadLogsComponent">
      <div class="scrollable-container3">
        <div
          v-for="(log, index) in allWebLogs"
          :key="index"
          class="event-item relative"
        >
          <b> {{ log.id }}: {{ log.description }} </b> -
          {{ convertJSONToDate(log.time) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { convertJSONToDate } from "../convertDate";
import TopPanel from "src/components/TopPanel.vue";
export default {
  components: {},
  data() {
    return {
      loadUsersComponent: false,
      loadEventsComponent: false,
      loadComplaintsComponent: false,
      loadComplaintDetailsComponent: false,
      isSearchActive: false,
      searchType: "all",
      searchWord: "",
      searchWordUsersComplaints: "",
      searchTypeUsersComplaints: "all",
      searchWordEventsComplaints: "",
      searchTypeEventsComplaints: "all",
    };
  },
  computed: {
    filteredUsers() {
      const searchWordLowerCase = this.searchWord.toLowerCase();

      if (this.searchType === "all") {
        return this.users;
      } else if (this.searchType === "id") {
        return this.users.filter((user) => {
          return user.id.toString().includes(searchWordLowerCase);
        });
      } else if (this.searchType === "email") {
        return this.users.filter((user) => {
          return user.email.includes(searchWordLowerCase);
        });
      } else if (this.searchType === "role") {
        return this.users.filter((user) => {
          return (
            user.roles.length > 0 &&
            user.roles[0].toLowerCase().includes(searchWordLowerCase)
          );
        });
      } else {
        return this.users;
      }
    },
    filteredUsersComplaints() {
      const searchWordLowerCase = this.searchWordUsersComplaints.toLowerCase();

      if (this.searchTypeUsersComplaints === "all") {
        return this.allUsersComplaints;
      } else if (this.searchTypeUsersComplaints === "email") { 
        return this.allUsersComplaints.filter((userComplaint) => {
          return userComplaint.userEmail.toString().includes(searchWordLowerCase);
        });
      } else if (this.searchTypeUsersComplaints === "header") {
        return this.allUsersComplaints.filter((userComplaint) => {
          return userComplaint.header.toLowerCase().includes(searchWordLowerCase);
        });
      } else { 
        return this.allUsersComplaints;
      }
    },

    filteredEventsComplaints() {
      const searchWordLowerCase = this.searchWordEventsComplaints.toLowerCase();

      if (this.searchTypeEventsComplaints === "all") {
        return this.allEventsComplaints;
      } else if (this.searchTypeEventsComplaints === "id") { 
        return this.allEventsComplaints.filter((eventComplaint) => {
          return eventComplaint.eventId.toString().includes(searchWordLowerCase);
        });
      } else if (this.searchTypeEventsComplaints === "header") {
        return this.allEventsComplaints.filter((eventComplaint) => {
          return eventComplaint.header.toLowerCase().includes(searchWordLowerCase);
        });
      } else { 
        return this.allEventsComplaints;
      }
    },

    ...mapGetters({
      users: "getUsers",
      status: "getUsersStatus",
      profile: "getProfile",
      events: "getEvents",
      allUsersComplaints: "getAllUsersComplaints",
      allEventsComplaints: "getAllEventsComplaints",
      allWebLogs: "getAllWebLogs",
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
    await this.getProfile();
    //await this.getUsers();
    await this.getEvents();
    //await this.getAllUsersComplaints();
    //await this.getAllEventsComplaints();
  },

  methods: {
    convertJSONToDate(date) {
      return convertJSONToDate(date);
    },
    isSearchTypeActive(type) {
      return this.searchType === type;
    },

    isSearchUserTypeActive(type) {
      return this.searchTypeUsersComplaints === type;
    },

    isSearchEventTypeActive(type) {
      return this.searchTypeEventsComplaints === type;
    },

    loadUsers() {
      this.loadUsersComponent = true;
      this.loadLogsComponent = false;
      this.loadComplaintsComponent = false;
      this.getUsers();
    },

    loadLogs() {
      this.loadUsersComponent = false;
      this.loadLogsComponent = true;
      this.loadComplaintsComponent = false;
      this.getAllWebLogs();
    },

    loadComplaints() {
      this.loadUsersComponent = false;
      this.loadLogsComponent = false;
      this.loadComplaintsComponent = true;

      this.getAllUsersComplaints();
      this.getAllEventsComplaints();
    },
    async getProfile() {
      //console.log(this.$store.getters.getCurrentUser);

      await Promise.all([
        this.profile != {}
          ? this.$store.dispatch("GET_PROFILE", {
              id: this.$store.getters.getCurrentUser,
            })
          : undefined,
      ]);
    },
    async getEvents() {
      await Promise.all([
        this.events.length < 1 ? this.$store.dispatch("GET_EVENTS") : undefined,
      ]);
    },

    banUser(userId) {
      //this.confirmAction('banUser', userId);

      this.$store.dispatch("BAN_USER", {
        userId: userId,
        adminEmail: this.profile.email,
        handler: (res) => {
          this.$store.dispatch("GET_USERS");
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        },
      });
    },

    unBanUser(userId) {
      //this.confirmAction('unBanUser', userId);

      this.$store.dispatch("UNBAN_USER", {
        userId: userId,
        adminEmail: this.profile.email,
        handler: (res) => {
          this.$store.dispatch("GET_USERS");
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        },
      });
    },

    deleteUser(userId) {
      //this.confirmAction('deleteUser', userId);

      this.$store.dispatch("DELETE_USER", {
        userId: userId,
        adminEmail: this.profile.email,
        handler: (res) => {
          this.$store.dispatch("GET_USERS");
        },
        handlerError: (errors) => {
          alert("Error occurred: " + errors);
        },
      });
    },
    async getUsers() {
      await Promise.all([
        this.users.length < 1 ? this.$store.dispatch("GET_USERS") : undefined,
      ]);
    },

    getAllUsersComplaints() {
      this.$store.dispatch("GET_ALL_USERS_COMPLAINTS");
      /*
      console.log("try");
      Promise.all([
        this.allUsersComplaints.length < 1 ? this.$store.dispatch("GET_ALL_USERS_COMPLAINTS") : undefined,
      ]);
      */
    },

    getAllEventsComplaints() {
      this.$store.dispatch("GET_ALL_EVENTS_COMPLAINTS");
    },

    putStatusComplaint(complaintId, complaintStatus) {
      if (
        complaintStatus === "work" &&
        complaintStatus != "process" &&
        complaintStatus != "reject"
      ) {
        var finalStatus = "В роботі адміністратором: " + this.profile.email;
      } else if (
        complaintStatus === "process" &&
        complaintStatus != "work" &&
        complaintStatus != "reject"
      ) {
        var finalStatus = "Опрацьовано адміністратором: " + this.profile.email;
      } else if (
        complaintStatus === "reject" &&
        complaintStatus != "process" &&
        complaintStatus != "work"
      ) {
        var finalStatus = "Відхилено адміністратором: " + this.profile.email;
      } else {
        alert("Error");
      }
      console.log(complaintId);
      console.log(complaintStatus);
      console.log(finalStatus);
      this.$store.dispatch("PUT_STATUS_COMPLAINT", {
        formData: {
          Id: complaintId,
          Status: finalStatus,
        },
        handler: (res) => {
          this.$store.dispatch("GET_ALL_USERS_COMPLAINTS");
          this.$store.dispatch("GET_ALL_EVENTS_COMPLAINTS");
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        },
      });
    },

    getAllWebLogs() {
      this.$store.dispatch("GET_ALL_WEB_LOGS");
    },
  },
};
</script>

<style scoped>
.scrollable-container1 {
  margin-top: 7px;
  width: 50%;
  max-height: 84vh;
  overflow-x: auto;
  display: inline-block;
  vertical-align: top;
}

.scrollable-content1 {
  width: 100%;
}

.scrollable-container2 {
  margin-top: 10px;
  max-height: 70vh;
  overflow-x: auto;
  flex-direction: column;
}

.scrollable-container3 {
  margin-top: 10px;
  max-height: 85vh;
  overflow-x: auto;
  flex-direction: column;
}

.centered-text1 {
  position: fixed;
  left: 25%;
  transform: translate(-50%, -50%);
  font-size: calc(0.5vw + 0.5rem);
  margin-bottom: 20px;
}

.centered-text2 {
  position: fixed;
  left: 75%;
  transform: translate(-50%, -50%);
  font-size: calc(0.5vw + 0.5rem);
  margin-bottom: 3px;
}

.clickable-link {
  text-decoration: none;
  color: #0066cc;
  cursor: pointer;
}

.clickable-link:hover {
  text-decoration: underline;
}

.complaint-column {
  column-count: 3;
}

.complaint-item {
  margin-bottom: 20px;
}

.active {
  background-color: #1f00bd;
  color: #fff;
}

.AdminTopLine {
  display: flex;
  justify-content: center;
  margin-bottom: 3px;
  color: #ffffff;
  background-color: #1f00bd;
}

.TopButtons {
  display: flex;
  margin-top: 7px;
  justify-content: center;
  gap: 10px;
}

.filters.q-gutter-xs {
  margin-left: 5%; 
  margin-right: 5%;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 10px;
}

.filters1.q-gutter-xs {
  max-width: 80%;
  margin-left: 5%; 
  margin-right: 20%;
  margin: 10px auto;
  gap: 10px;
}

.search {
  display: flex;
  max-width: 80%;
  margin: 10px auto;
  gap: 10px;
}

.search1 {
  display: flex;
  max-width: 90%;
  margin: 10px auto;
  gap: 10px;
}

.event-item {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 80%;
  margin: 10px auto;
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

.event-complaint {
  border: 1px solid #ccc;
  padding: 20px;
  max-width: 90%;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  background-color: #ffffff;
}

.event-complaint:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.event-complaint a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.event-complaint a:hover {
  color: #007bff;
}
</style>

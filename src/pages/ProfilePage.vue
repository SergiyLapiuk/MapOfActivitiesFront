<template>
  <div v-show="userPage">
    
    <div class="status" v-if="profileStatus == 'loading' || authStatus == ''">
      <q-spinner color="primary" size="3em" class="mx-auto" />
    </div>
    <div v-else-if="profileStatus == 'error'">Невдала спроба завантажти дані</div>
    <div v-else>
      <div class="TopLineProfile">
        <div class="profile-text-spacer"></div>
        <div class="profile-text" style="font-size: 16px; font-weight: 550">
          Профіль
        </div>
        <div class="logout-button">
          <div v-show="showReportButton">
            <q-btn
              v-if="this.$route.query.id != null"
              @click="reportUserPage" 
              label="Скарга"
              color="red-14"
            />
          </div>
          <q-btn v-if="this.$route.query.id == null || this.$route.query.id == this.$store.getters.getCurrentUser" @click="logout" label="Вийти" color="negative" />
        </div>
      </div>
      <div class="avatar-container">
        <img
          v-if="profile.imageURL"
          :src="this.API_URL + '/images/' + profile.imageURL"
          class="user-image"
        />
        <div v-else>
          <ProfileIcon />
        </div>
      </div>
      <div class="button-container">
        <q-btn
          v-if="this.$route.query.id == null || this.$route.query.id == this.$store.getters.getCurrentUser"
          :ripple="{ center: true }"
          color="secondary"
          style="width: 100%"
          label="Редагувати профіль"
          no-caps
          @click="editProfile"
        />
      </div>
      <div class="user-details">
        <div class="detail">
          <span class="label">E-mail</span>
          <span class="value">{{ profile.email }}</span>
        </div>
        <div class="fakeobject"></div>
        <div class="detail">
          <span class="label">Ім'я</span>
          <span class="value">{{ profile.name }}</span>
        </div>
      </div>
      <div class="user-details">
        <div class="detail">
          <span class="label">Опис</span>
          <span style="margin-bottom: 20px">{{ profile.description }}</span>
        </div>
      </div>
      <div>
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selected = tab"
          :class="['tab-btn', { active: selected === tab }]"
        >
          <span class="value">{{ tab }}</span>
        </button>

        <component :id="profile.id" :is="selected" class="tab"></component>
      </div>
    </div>
  </div>


  <div v-show = "showReportDetails">
    <div class="TopLine">
      <q-btn flat style @click="backToUserPage" icon="arrow_back" color="primary" />
      <div style="font-size: 16px; font-weight: 550">Деталі скарги на користувача</div>
        <q-btn
          flat
          style
          @click="reportUser"
          label="Відправити"
          color="primary"
        />
    </div>
            
    <div class="inputStyle">
          <div style="font-size: 16px; font-weight: 500; margin: 10px">
              Виберіть заголовок для скарги
            </div>
          <q-select 
            outlined 
            v-model="reportHeader" 
            :options="options" 
          />
            <div style="font-size: 16px; font-weight: 500; margin: 10px">
              Детальний опис Вашої скарги (опціонально)
            </div>
            <q-input 
              v-model="reportDescription" 
              outlined 
              autogrow 
              clearable
            />
        </div>
  </div>


</template>

<script>
import ProfileIcon from "../components/icons/ProfileIcon.vue";
import Приєднався from "../components/TabJoined.vue";
import Створив from "../components/TabCreated.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    ProfileIcon,
    Приєднався,
    Створив,
  },
  async mounted() {
    await this.getProfile();
  },  
  data() {
    return {
      API_URL: import.meta.env.VITE_API_URL,
      userEmail: "UserEmail",
      userName: "UserName",
      tabs: ["Приєднався", "Створив"],
      selected: "Приєднався",
      userPage: true, 
      showReportDetails: false,
      showReportButton: false,
      reportHeader: null,
      reportDescription: "",
      options: [
        'Нецензурне ім\'\я користувача', 
        'Некоректна фотографія профілю', 
        'Створення фальшивих подій', 
        'Створення небезпечних подій', 
        'Інше'
      ]
    };
  },
  computed: {
    ...mapGetters({
      profile: "getProfile",
      profileStatus: "getProfileStatus",
      authStatus: "getStatus",
    }),
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id == null) {
      this.getProfile1();
    }
    next();
  },
  methods: {
    backToUserPage() {
      this.showReportDetails = false;
      this.userPage = true;
    },
    reportUserPage(){
      this.showReportDetails = true;
      this.userPage = false;
    },

    editProfile() {
      this.$router.push({
        name: "edit-profile",
      });
    },
    async getProfile() {
      console.log(this.$store.getters.getCurrentUser);
      let userId;
      if(this.$route.query.id == null) {
        userId = this.$store.getters.getCurrentUser
        this.showReportButton = false
      }
      else {
        userId = this.$route.query.id
        this.showReportButton = true
      }
      console.log(userId);
      await Promise.all([
        this.profile != {}
          ? this.$store.dispatch("GET_PROFILE", {
              id: userId,
            })
          : undefined,
      ]);
    },

    async getProfile1() {
      await Promise.all([
        this.profile != {}
          ? this.$store.dispatch("GET_PROFILE", {
              id: this.$store.getters.getCurrentUser,
            })
          : undefined,
      ]);
    },

    async reportUser() {
      if (!this.reportHeader) {
        alert('Будь ласка, виберіть заголовок для вашої скарги.');
      return;
      }
      if (this.reportHeader === 'Інше' && !this.reportDescription) {
        alert('Ви вибрали заголовок "Інше", будь ласка, додайте опис Вашої скарги');
        return; 
      }
      var _userId = this.$route.query.id
      //const user = this.$store.getters.getProfile;
      this.curUser = this.$store.getters.getCurrentUser;
      console.log(this.curUser);
      сonsole.log(this.reportHeader);
      this.$store.dispatch("REPORT_USER", {
        userId: _userId,
        authorId: this.curUser,
        formData: {
          Header: this.reportHeader,
          Description: this.reportDescription,
        },
        handler: (res) => {
          this.$router.replace({ path: "/profile-page", name: "profile-page", query: { id: this.$route.query.id } });
          this.showReportDetails = false;
          this.userPage = true;
          this.reportHeader = "";
          this.reportDescription = "";
        },
        handlerError: (errors) => {
          console.error(errors.response.data);
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        },
      });
    },

    logout() {
      this.$store.commit("logOut");
      this.$router.push("/start-menu");
    },
  },
};
</script>

<style>
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

.TopLineProfile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 36px;
  border-bottom: 1px solid #8d8d8d;
}

.profile-text {
  position: absolute;
  width: 100%;
  text-align: center;
}

.profile-text-spacer {
  visibility: hidden; /* Робить блок невидимим, але він все ще займає місце в макеті */
}

.logout-button {
  /* Налаштування стилів для кнопки Logout, якщо потрібно */
}

.avatar-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.user-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  margin-bottom: 20px;
}

.user-details {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
  padding: 0 40px;
}

.detail {
  display: flex;
  flex-direction: column;
}

.label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: rgba(0, 0, 0, 0.56);
  margin-bottom: 4px;
}

.value {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin-bottom: 40px;
}

.fakeobject {
  width: 30%;
}

.tab-btn {
  padding: 10px;
  background: none;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 1px solid #000000;
  outline: none;
  width: 50%;
}

.active {
  border-bottom: 4px solid rgb(0, 0, 0);
  background: none;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>

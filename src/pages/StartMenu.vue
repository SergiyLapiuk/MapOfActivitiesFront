<template>
  <div v-if="showTabs"></div>
  <div v-show="showStartMenu" class="backgroundStartMenu">
    <div
      class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[19deg] text-[36px] md:text-[70px] text-center text-white"
      style="font-family: 'ReenieBeanie', sans-serif"
    >
      Map of Activities
    </div>

    <q-btn
      label="Реєстрація"
      @click="goToRegisterMenu"
      class="w-3/4 mx-auto flex flex-col px-5 py-2.5 bg-teal-400 rounded-[7px] items-center gap-2.5 text-weight-bold absolute bottom-1/4 left-1/2 transform -translate-x-1/2"
    />

    <q-btn
      label="У вас вже є аккаунт? Вхід"
      @click="goToLoginMenu"
      class="q-btn-none text-white text-[15px] items-center font-bold font-['Roboto'] underline tracking-tight mx-auto absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -mb-11"
      style="white-space: nowrap"
    />

    <q-btn
      label="Продовжити, як гість"
      @click="guestLogin"
      class="w-1/3 mx-auto flex flex-col px-5 py-2.5 bg-teal-400 rounded-[7px] items-center gap-2.5 text-weight-bold absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -mb-32"
    />

    <p
      class="text-white text-center"
      style="
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
      "
    >
      Ваші опції будуть обмежені, але ви можете зареєструватись пізніше.
    </p>
  </div>
  <div v-show="showRegister" class="background">
    <div class="TopLine">
      <q-btn flat style @click="goToStartMenu" icon="arrow_back" color="primary" />
        <q-btn
          flat
          style
          @click="registerUser"
          label="Реєстрація"
          color="primary"
        />
    </div>
    <div class="inputStyle">
        <q-input
          square
          outlined
          v-model="name"
          label="Ім'я"
          type="text"
          clearable
        />
        <q-input
          square
          outlined
          v-model="email"
          label="Email"
          type="text"
          clearable
        />
      <q-input
        square
        outlined
        v-model="password"
        label="Пароль"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        square
        outlined
        v-model="password1"
        label="Підтвердіть пароль"
        :rules="[validatePassword]"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
  </div>

  <div v-show="showLogin" class="background">
    <div class="TopLine">
      <q-btn flat style @click="goToStartMenu" icon="arrow_back" color="primary" />
        <q-btn
          flat
          style
          @click="loginUser"
          label="Вхід"
          color="primary"
        />
    </div>
      <div class="inputStyle">
          <q-input
            square
            outlined
            v-model="email"
            label="Email"
            type="text"
            clearable
          />
        <q-input
          square
          outlined
          v-model="password"
          label="Пароль"
          :type="isPwdLogin ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdLogin ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdLogin = !isPwdLogin"
            />
          </template>
        </q-input>
    </div>
    <div
      v-if="this.codeExists && confirmStatus === 'success'"
      class="success-message"
    >
      Пошта підтверджена
    </div>
    <div
      v-if="this.codeExists && confirmStatus === 'error'"
      class="error-message"
    >
      Пошта не підтверджена
    </div>
    <div
      v-if="this.loginError == true"
      class="error-message"
    >
      Вам на пошту було надіслано листа, перейдіть за посиланням в ньому для підтвердження
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "", 
      password1: "",
      isPwd: true,
      isPwdLogin: true,
      showStartMenu: true,
      showLogin: false,
      showRegister: false,
      userId: "",
      code: "",
      codeExists: false,
      loginError: false,
    };
  },
  computed: {
    ...mapGetters({
      confirmStatus: "getConfirmStatus",
    }),
  },
  props: {
    showTabs: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    password(newValue) {
      this.passwordMismatch = newValue !== this.password1;
    },
    password1(newValue) {
      this.passwordMismatch = newValue !== this.password;
    },
  },
  async mounted() {
    this.inputProcessing();
  },
  methods: {
    async inputProcessing() {
      const queryString = window.location.hash.substring(13);
      const paramsArray = queryString.split("&");
      if (paramsArray.length > 1) {
        this.userId = paramsArray[0].replace("userId=", "");
        this.code = paramsArray[1].replace("code=", "");
        if (this.userId != null && this.code != null) {
          await this.getConfirm();
          this.$router.push({ name: "start-menu", params: {} });
          this.codeExists = true;
          this.goToLoginMenu();
        }
      }
    },
    validatePassword(val) {
      return val === this.password || "Password is not matched";
    },
    async getConfirm() {
      await Promise.all([
        this.$store.dispatch("GET_CONFIRM", {
          id: this.userId,
          code: this.code,
        }),
      ]);
      console.log("get");
    },

    goToRegisterMenu() {
      this.showStartMenu = false;
      this.showRegister = true;
      this.showLogin = false;
    },

    goToLoginMenu() {
      this.showStartMenu = false;
      this.showRegister = false;
      this.showLogin = true;
    },

    goToStartMenu() {
      this.showStartMenu = true;
      this.showLogin = false;
      this.showRegister = false;
    },

    guestLogin() {
      this.$store.commit("logOut");
      this.$router.push({ name: "events-list", params: {} });
    },

    async registerUser() {
      this.$store.dispatch("POST_REGISTER", {
        formData: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
        handler: (res) => {
          console.log("success: " + res);
          this.goToLoginMenu();
          this.loginError = true;
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
        },
      });
    },

    async loginUser() {
      this.$store.dispatch("POST_USER_LOGIN", {
        formData: {
          email: this.email,
          password: this.password,
          rememberMe: true,
        },
        handler: (res) => {
          console.log("success: " + res);
            console.log(this.$store.getters.getCurrentUser);
            console.log(this.$route.query.id);
            let userId;
            if(this.$route.query.id == null) {
              userId = this.$store.getters.getCurrentUser
            }
            else {
              userId = this.$route.query.id
            }
            console.log(userId);
            Promise.all([
              this.profile != {}
                ? this.$store.dispatch("GET_PROFILE", {
                    id: userId,
                  })
                : undefined,
            ]);
          this.$router.push({ name: "events-list", params: {} }); // треба це закоментити щоб протестувати refreshToken()
        },
        handlerError: async (errors) => {
          console.log("error: " + errors);
        },
      });
    },

    async refreshToken() {
      this.$store.dispatch("POST_REFRESH_TOKEN", {
        formData: {
          accessToken: this.$store.getters.getToken,
          refreshToken: this.$store.getters.getRefreshToken,
        },
        handler: (res) => {
          console.log("success: " + res);
        },
        handlerError: (errors) => {
          console.log("error: " + errors.response);
        },
      });
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
.background {
  background: url("../assets/backgroundV1.png");
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
.button {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.success-message,
.error-message {
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
}

.success-message {
  background-color: #dff0d8;
  color: #4cae4c;
}

.error-message {
  background-color: #f2dede;
  color: #a94442;
}

@font-face {
  font-family: "ReenieBeanie";
  src: url("src/assets/ReenieBeanie.ttf") format("woff2"),
    url("src/assets/ReenieBeanie.ttf") format("woff");
  font-weight: normal;
  font-style: normal;
}

.backgroundStartMenu {
  background: url("../assets/c5f8eda9c79b4f890ccbaf6a2da79cf6.png");
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>

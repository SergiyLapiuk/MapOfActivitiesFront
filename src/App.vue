<template>
  <div>
    <router-view  />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import notificationHub from "./NotificationHub";
export default defineComponent({
  name: "App",
  async created() {
    await this.checkRefreshToken();
    setInterval(this.checkRefreshToken, 15 * 60 * 1000); //15000 - 15 секунд
    //setInterval(this.checkRefreshToken, 15000);  //15000 - 15 секунд
    //this.$emit("app-initialized");
    notificationHub.client.on("SendMessageToEveryone", (name, message) => {
      console.log("ssss" + notificationHub.client);
    });
    notificationHub.start();
  },
  async mounted() {
    await this.getProfile();
  },
  methods: {
    async checkRefreshToken() {
      console.log("checkRefreshToken launched");
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        try {
          this.$store.dispatch("POST_REFRESH_TOKEN", {
            formData: {
              accessToken,
              refreshToken,
            },
            handler: (res) => {
              console.log("Token refreshed: " + res);

              this.$store.commit("updateTokens", {
                token: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              });

              if (accessToken && refreshToken) {
                try {
                  this.$store.dispatch("POST_USERID", {
                    formData: {
                      accessToken: this.$store.getters.getToken,
                      refreshToken: this.$store.getters.getRefreshToken,
                    },
                    handler: (res) => {
                      console.log("Automatic login success");
                      this.$store.commit("updateUserId", {
                        userId: res.data.user.userId,
                        role: res.data.roles,
                      });
                    },
                    handlerError: (errors) => {
                      console.log("Automatic login error:", errors);
                    },
                  });
                } catch (error) {
                  console.error("Error automatic login:", error);
                }
              }
            },
            handlerError: (errors) => {
              console.log("Error: " + errors.response);
            },
          });
        } catch (error) {
          console.error("error token refresh:", error);
        }
      }
    },

    async getProfile() {
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
      await Promise.all([
        this.profile != {}
          ? this.$store.dispatch("GET_PROFILE", {
              id: userId,
            })
          : undefined,
      ]);
    },
  },
  
});
</script>

<style></style>

<style>
@import "/src/index.css";
</style>

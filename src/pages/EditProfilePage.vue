<template>
  <div>
    <div class="TopLineEditProfile">
      <div style="font-size: 16px; font-weight: 550">Редагування профілю</div>
    </div>
    <div class="inputStyleProfile">
      <q-input
        square
        outlined
        v-model="profile.name"
        label="Ім'я"
        clearable
        :rules="[
          (val) => !!val || 'Необхідно заповнити',
          (val) => (val && val.length <= 50) || 'Не більше 50 символів',
          (val) =>
            (val && /^[?!@()№,.;:a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9\s]*$/u.test(val)) ||
            'Можливі лише літери, цифри та символи',
        ]"
      ></q-input>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #8d8d8d;
      "
    >
      <div style="font-size: 16px; font-weight: 500; margin: 10px">
        Розкажіть про себе
      </div>
      <q-input
        v-model="profile.description"
        outlined
        autogrow
        style="width: 95%"
      />

      <div style="font-size: 16px; font-weight: 500; margin: 10px">
        Виберіть фото профілю або видаліть поточне (за бажанням)
      </div>
      <q-file
        v-model="files"
        label="Вибір фото"
        outlined
        multiple
        style="max-width: 300px; margin-bottom: 10px"
      />
      <q-btn
        :ripple="{ center: true }"
        @click="deletePicture"
        color="red"
        label="Видалити фото"
        no-caps
        style="margin-bottom: 20px"
      />
      <div v-if="deletedPicture">
        Фото буде видалене після збереження змін
      </div>
    </div>
    <div class="edit-button-container">
      <q-btn
        :ripple="{ center: true }"
        @click="updateProfile"
        color="secondary"
        style="width: 100%"
        label="Зберегти зміни"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      profile: {},
      files: [],
      deletedPicture: false,
    };
  },
  async created() {
    this.$watch(
      () => this.$store.getters.getStatus,
      async (newStatus, oldStatus) => {
        if (newStatus === "active" && newStatus !== oldStatus) {
          await this.getProfile();
          this.profile = JSON.parse(
            JSON.stringify(this.$store.getters.getProfile)
          );
        }
      }
    );

    if (this.$store.getters.getStatus === "active") {
      await this.getProfile();
      this.profile = JSON.parse(JSON.stringify(this.$store.getters.getProfile));
    }
  },
  computed: {
    ...mapGetters({ CurrentUser: "getCurrentUser", profile: "getProfile", }),
  },
  mounted() {
    //await this.getProfile();
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: "edit-profile",
      });
    },
    async getProfile() {
      console.log(this.$store.getters.getCurrentUser);
      if (this.$store.getters.getCurrentUser) {
        await Promise.all([
          this.profile != {}
            ? this.$store.dispatch("GET_PROFILE", {
                id: this.$store.getters.getCurrentUser,
              })
            : undefined,
        ]);
      }
    },

    deletePicture() {
      this.deletedPicture = true;
    },
    convertFileToDataUrl(file) {
      if (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      } else if (this.deletedPicture) {
        return "The picture has been deleted";
      } else {
        return "";
      }
    },
    async updateProfile() {
      this.profile.imageURL = await this.convertFileToDataUrl(this.files[0]);
      this.$store.dispatch("PUT_PROFILE", {
        formData: this.profile,
        id: this.$store.getters.getCurrentUser,
        handler: (res) => {
          this.$router.push({ name: "profile-page", params: {} });
        },
        handlerError: (errors) => {
          console.log("error: " + errors);
          alert("Error occurred: " + errors);
        },
      });
    },
  },
};
</script>

<style>
.TopLineEditProfile {
  display: flex;
  justify-content: center; /* Вирівнює горизонтально по центру */
  align-items: center; /* Вирівнює вертикально по центру */
  margin-bottom: 20px;
  height: 36px; /* Ви можете встановити конкретну висоту */
  border-bottom: 1px solid #8d8d8d; /* Adds a bottom border line */
}
.inputStyleProfile {
  display: block;
  margin: auto;
  max-width: 95%;
  font-size: 25px;
}
.edit-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px; /* Додаємо відступи з кожного боку, наприклад, по 10px */
  margin-bottom: 20px;
}
</style>

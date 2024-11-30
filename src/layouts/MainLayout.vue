<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="showTabs">
      <div class="bg-white text-black">
        <q-tabs class="m-auto">
          <q-route-tab
            :to="{ name: 'admin-menu' }"
            v-if="isAdmin"
            icon="admin_panel_settings"
            label="Адмін"
          />

          <q-route-tab
            v-if="isGuest"
            :to="{ name: 'start-menu' }"
            icon="account_circle"
            label="Акаунт"
          />
          <q-route-tab
            v-else
            :to="{ name: 'profile-page' }"
            icon="account_circle"
            label="Акаунт"
          />

          <q-route-tab
            :to="{ name: 'events-list' }"
            icon="list"
            label="Список"
          />
          <q-route-tab :to="{ name: 'map' }" icon="map" label="Мапа" />
          <q-route-tab
            v-if="!isGuest"
            :to="{ name: 'create-event' }"
            icon="create"
            label="Створити"
          />
        </q-tabs>
      </div>
    </q-footer>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import { admin, guest } from "src/roleGetter";

export default {
  name: "MainLayout",

  data() {
    return {
      showFilters: false,
      showTabs: true,
    };
  },

  computed: {
    ...mapGetters({
      role: "getCurrentRole",
    }),
    isAdmin() {
      return this.role == "Admin";
    },
    isGuest() {
      return this.role == null;
    },
  },

  beforeRouteEnter(to, from, next) {
    const showTabs = to.name !== "start-menu";
    next((vm) => {
      vm.showTabs = showTabs;
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.showTabs = to.name !== "start-menu";
    next();
  },
};
</script>
<style>
body {
  background: url("../assets//backgroundV1.png");
  background: cover;
  background-size: cover;
}
</style>

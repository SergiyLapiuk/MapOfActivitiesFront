import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import eventTypes from "./eventTypes/index";
import event from "./event/index";
import events from "./events/index";
import filters from "./typeFilters/index";
import auth from "./auth/index";
import password from "./password/index";
import user from "./user/index";
import admin from "./admin/index";
import visitings from "./visitings/index";
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      eventTypes,
      events,
      event,
      filters,
      auth,
      password,
      user,
      admin,
      visitings,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});

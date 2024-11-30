import {
  getEvents,
  putEvent,
  postEvent,
  deleteEvent,
  getUserEvents,
  getAuthorEvents,
} from "../../api/apiServices";

export default {
  state: {
    events: [],
    eventsStatus: "",
    userEventsStatus: "",
    userEvents: [],
    authorEventsStatus: "",
    authorEvents: [],
  },
  mutations: {
    getEventsRequest: (state) => {
      state.eventsStatus = "loading";
    },
    getUserEventsRequest: (state) => {
      state.userEventsStatus = "loading";
    },
    getAuthorEventsRequest: (state) => {
      state.authorEventsStatus = "loading";
    },
    getEventsSuccess: (state, res) => {
      state.eventsStatus = "success";
      state.events = res;
    },
    getUserEventsSuccess: (state, res) => {
      state.userEventsStatus = "success";
      state.userEvents = res;
    },
    getEventsError: (state) => {
      state.eventsStatus = "error";
    },
    getUserEventsError: (state) => {
      state.userEventsStatus = "error";
    },
    getAuthorEventsSuccess: (state, res) => {
      state.authorEventsStatus = "success";
      state.authorEvents = res;
    },
    getAuthorEventsError: (state) => {
      state.authorEventsStatus = "error";
    },
    clearEvents: (state) => {
      state.events = [];
      state.eventsStatus = "";
    },
  },
  actions: {
    async GET_EVENTS({ dispatch, commit, getters }, payload) {
      commit("getEventsRequest");
      let filters;
      if (payload?.filters == null) {
        filters = {};
        if (localStorage.getItem("filters")) {
          filters = JSON.parse(localStorage.getItem("filters"));
          filters.types = getters.getSelectedLeafTypes;
        } else {
          filters = { startTime: new Date().toISOString() };
        }
      } else {
        filters = payload.filters;
      }
      filters.searchName = payload?.searchName;
      await getEvents(filters)
        .then((res) => {
          commit("getEventsSuccess", res.data);
        })
        .catch((e) => {
          commit("getEventsError");
        });
    },

    async GET_USER_EVENTS({ dispatch, commit }, payload) {
      commit("getUserEventsRequest");
      await getUserEvents(payload.id)
        .then((res) => {
          commit("getUserEventsSuccess", res.data);
        })
        .catch((e) => {
          commit("getUserEventsError");
        });
    },

    async GET_AUTHOR_EVENTS({ dispatch, commit }, payload) {
      commit("getAuthorEventsRequest");
      await getAuthorEvents(payload.id)
        .then((res) => {
          commit("getAuthorEventsSuccess", res.data);
        })
        .catch((e) => {
          commit("getAuthorEventsError");
        });
    },
  },

  getters: {
    getEventsStatus: (state) => state.eventsStatus || [],
    getEvents: (state) => state.events || [],
    getUserEventsStatus: (state) => state.userEventsStatus || [],
    getUserEvents: (state) => state.userEvents || [],
    getAuthorEventsStatus: (state) => state.authorEventsStatus || [],
    getAuthorEvents: (state) => state.authorEvents || [],
  },
};

import {
  getEvent,
  putEvent,
  postEvent,
  deleteEvent,
} from "../../api/apiServices";

export default {
  state: {
    event: {},
    eventStatus: "",
  },
  mutations: {
    getEventRequest: (state) => {
      state.eventStatus = "loading";
    },
    getEventSuccess: (state, res) => {
      state.eventStatus = "success";
      state.event = res;
    },
    getEventError: (state) => {
      state.eventStatus = "error";
    },
    clearEvent: (state) => {
      state.event = {};
      state.eventStatus = "";
    },
  },
  actions: {
    async GET_EVENT({ dispatch, commit }, payload) {
      commit("getEventRequest");
      await getEvent(payload.id)
        .then((res) => {
          commit("getEventSuccess", res.data);
        })
        .catch((e) => {
          commit("getEventError");
        });
    },
    async PUT_EVENT({ dispatch, commit }, payload) {
      await putEvent(payload.id, payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
    async POST_EVENT({ dispatch, commit }, payload) {
      await postEvent(payload.formData)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
    async DELETE_EVENT({ dispatch, commit }, payload) {
      await deleteEvent(payload.id)
        .then((res) => {
          payload.handler(res);
        })
        .catch((e) => {
          payload.handlerError(e);
        });
    },
  },

  getters: {
    getEventStatus: (state) => state.eventStatus || "",
    getEvent: (state) => state.event || "",
  },
};